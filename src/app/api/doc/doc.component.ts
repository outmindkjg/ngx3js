import {
  Component,
  ElementRef, OnInit, ViewChild
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit {

  @ViewChild('apiDoc') private docEle: ElementRef;

  private subscription: Subscription;

  constructor(private router: Router, private ele : ElementRef, private http: HttpClient, protected sanitizer: DomSanitizer) {
    this.subscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.changeRouter(event.urlAfterRedirects || event.url);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  ngOnInit(): void {

		const pageProperties = {};
		const titles = {};
		const categoryElements = [];

    window['setUrlFragment'] = ( pageName ) => { 

			const splitPageName = this.decomposePageName( pageName, '.', '.' );
			const currentProperties = pageProperties[ splitPageName[ 0 ] ];
      console.log(splitPageName);

			if ( currentProperties ) {

				window.location.hash = currentProperties.pageURL + splitPageName[ 1 ];

			} 

		}
  }

  decomposePageName( pageName, oldDelimiter, newDelimiter ) {

    // Helper function for separating the member (if existing) from the pageName
    // For example: 'Geometry.morphTarget' can be converted to
    // ['Geometry', '.morphTarget'] or ['Geometry', '#morphTarget']
    // Note: According RFC 3986 no '#' allowed inside of an URL fragment!

    let parts = [];

    const dotIndex = pageName.indexOf( oldDelimiter );

    if ( dotIndex !== - 1 ) {

      parts = pageName.split( oldDelimiter );
      parts[ 1 ] = newDelimiter + parts[ 1 ];

    } else {

      parts[ 0 ] = pageName;
      parts[ 1 ] = '';

    }

    return parts;

  }  

  public menuId: string = '';

  changeRouter(url: string) {
    this.menuId = url;
    this.http.get('assets'+this.menuId+'.html', {
      responseType : 'text'
    }).subscribe ( 
      response => { 
        this.setBody(response);
      } 
    );
    console.log(this.menuId);
  }

  public html : SafeHtml = 'test';

  setBody(body : string) {
    const start = body.indexOf('<body>') + 6;
    const end = body.lastIndexOf('</body>');
    const html = body.substring(start, end);
    let path, localizedPath;
    const pathname = window.location.hash;
    const section = /\/(manual|api|examples)\//.exec( pathname )[ 1 ].toString().split( '.html' )[ 0 ];
    let name = /[\-A-z0-9]+/.exec( pathname ).toString().split( '.html' )[ 0 ];
    switch ( section ) {

      case 'api':
        localizedPath = /\/api\/[A-z0-9\/]+/.exec( pathname ).toString().substr( 5 );
        // Remove localized part of the path (e.g. 'en/' or 'es-MX/'):
        path = localizedPath.replace( /^[A-z0-9-]+\//, '' );
        break;
  
      case 'examples':
        path = localizedPath = /\/examples\/[A-z0-9\/]+/.exec( pathname ).toString().substr( 10 );
        break;
      case 'manual':
        name = name.replace( /\-/g, ' ' );
        path = pathname.replace( /\ /g, '-' );
        path = localizedPath = /\/manual\/[-A-z0-9\/]+/.exec( path ).toString().substr( 8 );
        break;
    }
  
    console.log(name);
    let text = html;
    text = text.replace( /\[name\]/gi, name );
    text = text.replace( /\[path\]/gi, path );
    text = text.replace( /\[page:([\w\.]+)\]/gi, "[page:$1 $1]" ); // [page:name] to [page:name title]
    text = text.replace( /\[page:\.([\w\.]+) ([\w\.\s]+)\]/gi, "[page:" + name + ".$1 $2]" ); // [page:.member title] to [page:name.member title]
    text = text.replace( /\[page:([\w\.]+) ([\w\.\s]+)\]/gi, "<a onclick=\"window.setUrlFragment('$1')\" title=\"$1\">$2</a>" ); // [page:name title]
    // text = text.replace( /\[member:.([\w]+) ([\w\.\s]+)\]/gi, "<a onclick=\"window.setUrlFragment('" + name + ".$1')\" title=\"$1\">$2</a>" );
  
    text = text.replace( /\[(member|property|method|param):([\w]+)\]/gi, "[$1:$2 $2]" ); // [member:name] to [member:name title]
    text = text.replace( /\[(?:member|property|method):([\w]+) ([\w\.\s]+)\]\s*(\(.*\))?/gi, "<a onclick=\"window.setUrlFragment('" + name + ".$2')\" target=\"_parent\" title=\"" + name + ".$2\" class=\"permalink\">#</a> .<a onclick=\"window.setUrlFragment('" + name + ".$2')\" id=\"$2\">$2</a> $3 : <a class=\"param\" onclick=\"window.setUrlFragment('$1')\">$1</a>" );
    text = text.replace( /\[param:([\w\.]+) ([\w\.\s]+)\]/gi, "$2 : <a class=\"param\" onclick=\"window.setUrlFragment('$1')\">$1</a>" ); // [param:name title]
  
    text = text.replace( /\[link:([\w|\:|\/|\.|\-|\_]+)\]/gi, "[link:$1 $1]" ); // [link:url] to [link:url title]
    text = text.replace( /\[link:([\w|\:|\/|\.|\-|\_|\(|\)|\?|\#|\=|\!]+) ([\w|\:|\/|\.|\-|\_|\s]+)\]/gi, "<a href=\"$1\"  target=\"_blank\">$2</a>" ); // [link:url title]
    text = text.replace( /\*([\w|\d|\"|\-|\(][\w|\d|\ |\-|\/|\+|\-|\(|\)|\=|\,|\.\"]*[\w|\d|\"|\)]|\w)\*/gi, "<strong>$1</strong>" ); // *
  
    text = text.replace( /\[example:([\w\_]+)\]/gi, "[example:$1 $1]" ); // [example:name] to [example:name title]
    text = text.replace( /\[example:([\w\_]+) ([\w\:\/\.\-\_ \s]+)\]/gi, "<a href=\"#examples/$1\">$2</a>" ); // [example:name title]
  
    text = text.replace( /<a class="param" onclick="window.setUrlFragment\('\w+'\)">(null|this|Boolean|Object|Array|Number|String|Integer|Float|TypedArray|ArrayBuffer)<\/a>/gi, '<span class="param">$1</span>' ); // remove links to primitive types
    text = text.replace( /\<code>/gi, "<code class='prettyprint'>" );
    
    this.html = this.sanitizer.bypassSecurityTrustHtml(text);

    // this.docEle.nativeElement.innerHTML = html;
    // console.log(html);
  }
}
