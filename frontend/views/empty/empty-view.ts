import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../../views/view';

@customElement('empty-view')
export class EmptyView extends View {
  render() {
    return html`<div>Content placeholder</div>`;
  }
}
