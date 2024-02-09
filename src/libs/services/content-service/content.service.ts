import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {v4} from "uuid";
import {Endpoint, ENDPOINT_BASE, EndpointPaths} from "../../model/endpoints";
import {DEFAULT_ITEM, Item} from "../../model/item";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private httpClient: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private selectedContent?: Item;
  private contentList: Item[] = [];

  constructor() {
    // Later revision add error handling with observables from rxjs
    this.httpClient.get<Item[]>(ENDPOINT_BASE + EndpointPaths.get(Endpoint.INVENTORY))
      .subscribe(resp => {
        this.contentList = resp;
        console.log('Response: ' + JSON.stringify(resp));
      });
  }

  addContent(addedContent: Item) {
    addedContent.id = v4();
    // Would be a post call here to create it on the backend
    this.contentList.push({...addedContent});
  }

  updateContent(contentEvent: Item) {
    let idx: number = this.findIdxForContent(contentEvent);
    console.log('Update Content: ' + idx);

    // Weird quirk with the form the state of the expiration is still set
    // if it was previously, so clear it out here before saving
    if (!contentEvent.hasExpiration) {
      contentEvent.expirationDate = '';
    }

    if (idx !== -1) {
      // Would be a put call here to update the existing content on the backend
      this.contentList[idx] = {...contentEvent};
    } else {
      this.addContent(contentEvent)
    }
    this.resetSelectedContent();
  }

  deleteContent(deletedContent: Item) {
    let idx: number = this.findIdxForContent(deletedContent);

    if (idx !== -1) {
      // Would be a delete call here to delete it from the backend
      this.contentList.splice(idx, 1);
    }

    // Need to can the current item selected if its being deleted
    if (this.selectedContent && deletedContent.id === this.selectedContent.id) {
      this.resetSelectedContent();
    }
  }

  getAllContent() : Item[] {
    return this.contentList;
  }

  selectContent(contentEvent: Item) {
    this.selectedContent = contentEvent;
    this.router.navigate(['dashboard/' + contentEvent.id]);
  }

  resetSelectedContent() {
    this.selectedContent = undefined;
    this.router.navigate(['dashboard/']);
    console.log('RESET');
  }

  getContentById(id: string): Item | null {
    let idx: number = this.findIdxById(id);

    if (idx !== -1) {
      return this.contentList[idx];
    }
    return null;
  }

  private findIdxForContent(searchContent: Item) : number {
    return this.findIdxById(searchContent.id)
  }

  private findIdxById(id: string | null) {
    return this.contentList.findIndex(content => content.id === id);
  }
}
