import { LitElement, html } from "lit"

export default class SearchBox extends LitElement {

    name?: string = 'search'

    render() {
        return html`<input class="rkts.SearchBox-input" type="search" name="${this.name}" />`
    }
}

customElements.define('rkts-search-box', SearchBox)