import {
  Component,
  ElementRef, OnInit, ViewChild
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { DocsComponent } from '../docs.component';
import { HighlightJS } from 'ngx-highlightjs';
// import { NgxPrettifyService } from '@smartcodelab/ngx-prettify';

// const PR = require('prettify');

// console.log(PR);

@Component({
  selector: 'app-api-read',
  templateUrl: './api-read.component.html',
  styleUrls: ['./api-read.component.scss']
})
export class ApiReadComponent implements OnInit {

  @ViewChild('apiDoc') private docEle: ElementRef;

  private subscription: Subscription;

  constructor(private router: Router, private ele : ElementRef, private http: HttpClient, protected sanitizer: DomSanitizer, protected docsComponent : DocsComponent, protected highlightJS : HighlightJS) {
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
  public pageName : string = '';
  public tagName : string = '';

  changeRouter(url: string) {
    this.menuId = url.substr(6).split('.')[0];
    this.pageName = /[\-A-z0-9]+$/.exec( this.menuId ).toString();
    this.tagName = url.indexOf('.') > 0 ? url.split('.')[1] : null;
    this.http.get('assets/'+this.menuId+'.html', {
      responseType : 'text'
    }).subscribe ( 
      response => { 
        this.setBody(response, this.menuId);
      } 
    );
  }

  setBody(body : string, pageId : string) {
    const start = body.indexOf('<body>') + 6;
    const end = body.lastIndexOf('</body>');
    const html = body.substring(start, end);
    let path, localizedPath;
    const pathname = '/' + pageId;
    const section = /\/(api|manual|examples)\//.exec( pathname )[ 1 ].toString();
    let name = /[\-A-z0-9]+$/.exec( pathname ).toString();
    switch ( section ) {
      case 'api':
        localizedPath = /\/api\/[A-z0-9\/]+/.exec( pathname ).toString().substr( 5 );
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
        const href:string = (e.target as HTMLAnchorElement).getAttribute('href');
        const hrefId = href.substr( href.indexOf('#') + 1);
        if (hrefId.startsWith(this.pageName)) {
          this.setFocus(hrefId.substr(this.pageName.length + 1));
        } else {
          this.docsComponent.changePage(hrefId);
        }
        e.stopPropagation();
        e.preventDefault();
        return false;
      })
    }
    const codes = this.docEle.nativeElement.getElementsByTagName('code');
    for(let i = 0 ; i < codes.length ; i++) {
      const code = codes[i];
      // this.highlightJS.highlightBlock(code);
      this.highlightJS.highlightAuto(code.innerHTML, undefined).subscribe((hi : HighlightResult) => {
        code.innerHTML =hi.value;
      });
      // code.innerHTML = afterHtml;
    }
    if (this.tagName !== null) {
      this.setFocus(this.tagName);
      this.tagName = null;
    }
  }

  setFocus(menuId: string) {
    setTimeout(() => {
      const links: HTMLAnchorElement[] = this.docEle.nativeElement.getElementsByTagName('a');
      let selected: HTMLAnchorElement = null;
      for (let i = 0; i < links.length; i++) {
        if (links[i].getAttribute('id') === menuId) {
          selected = links[i];
          break;
        }
      }
      if (selected !== null) {
        selected.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }, 100);
  }

}
