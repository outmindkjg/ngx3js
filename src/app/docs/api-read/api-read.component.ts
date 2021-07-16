import {
  Component,
  ElementRef, OnInit, ViewChild
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-api-read',
  templateUrl: './api-read.component.html',
  styleUrls: ['./api-read.component.scss']
})
export class ApiReadComponent implements OnInit {

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
    
  }

  public menuId: string = '';

  changeRouter(url: string) {
    this.menuId = url.substr(6);
    console.log(this.menuId);
    this.http.get('assets/'+this.menuId+'.html', {
      responseType : 'text'
    }).subscribe ( 
      response => { 
        this.setBody(response);
      } 
    );
  }

  setBody(body : string) {
    const start = body.indexOf('<body>') + 6;
    const end = body.lastIndexOf('</body>');
    const html = body.substring(start, end);
    let path, localizedPath;
    const pathname = window.location.hash;
    console.log(/\/(api|manual|examples)\//.exec( pathname ));
    const section = /\/(api|manual|examples)\//.exec( pathname )[ 1 ].toString().split( '.html' )[ 0 ];
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
  
    let text = html;
    text = text.replace( /\[name\]/gi, name );
    text = text.replace( /\[path\]/gi, path );
    text = text.replace( /\[page:([\w\.]+)\]/gi, "[page:$1 $1]" ); // [page:name] to [page:name title]
    text = text.replace( /\[page:\.([\w\.]+) ([\w\.\s]+)\]/gi, "[page:" + name + ".$1 $2]" ); // [page:.member title] to [page:name.member title]
    text = text.replace( /\[page:([\w\.]+) ([\w\.\s]+)\]/gi, "<a href=\"#$1\" title=\"$1\">$2</a>" ); // [page:name title]
    // text = text.replace( /\[member:.([\w]+) ([\w\.\s]+)\]/gi, "<a href=\"#" + name + ".$1\" title=\"$1\">$2</a>" );
  
    text = text.replace( /\[(member|property|method|param):([\w]+)\]/gi, "[$1:$2 $2]" ); // [member:name] to [member:name title]
    text = text.replace( /\[(?:member|property|method):([\w]+) ([\w\.\s]+)\]\s*(\(.*\))?/gi, "<a href=\"#" + name + ".$2\" title=\"" + name + ".$2\" class=\"permalink\">#</a> .<a href=\"#" + name + ".$2\" id=\"$2\">$2</a> $3 : <a class=\"param\" href=\"#$1\">$1</a>" );
    text = text.replace( /\[param:([\w\.]+) ([\w\.\s]+)\]/gi, "$2 : <a class=\"param\" href=\"#$1\">$1</a>" ); // [param:name title]
  
    text = text.replace( /\[link:([\w|\:|\/|\.|\-|\_]+)\]/gi, "[link:$1 $1]" ); // [link:url] to [link:url title]
    text = text.replace( /\[link:([\w|\:|\/|\.|\-|\_|\(|\)|\?|\#|\=|\!]+) ([\w|\:|\/|\.|\-|\_|\s]+)\]/gi, "<a href=\"$1\"  target=\"_blank\">$2</a>" ); // [link:url title]
    text = text.replace( /\*([\w|\d|\"|\-|\(][\w|\d|\ |\-|\/|\+|\-|\(|\)|\=|\,|\.\"]*[\w|\d|\"|\)]|\w)\*/gi, "<strong>$1</strong>" ); // *
  
    text = text.replace( /\[example:([\w\_]+)\]/gi, "[example:$1 $1]" ); // [example:name] to [example:name title]
    text = text.replace( /\[example:([\w\_]+) ([\w\:\/\.\-\_ \s]+)\]/gi, "<a href=\"#examples/$1\">$2</a>" ); // [example:name title]
  
    // text = text.replace( /<a class="param" onclick="window.setUrlFragment\('\w+'\)">(null|this|Boolean|Object|Array|Number|String|Integer|Float|TypedArray|ArrayBuffer)<\/a>/gi, '<span class="param">$1</span>' ); // remove links to primitive types
    text = text.replace( /\<code>/gi, "<code class='prettyprint'>" );
    this.docEle.nativeElement.innerHTML = text;
    const links = this.docEle.nativeElement.getElementsByTagName('a');
    for(let i = 0 ; i < links.length ; i++) {
      const link = links[i];
      link.addEventListener('click', (e : Event) => {
        console.log(link.href);
        e.stopPropagation();
        e.preventDefault();
        return false;
      })
    }
  }
}
