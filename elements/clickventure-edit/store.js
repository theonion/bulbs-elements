import { Store } from 'bulbs-elements/store';
import NodesField from './fields/nodes';
import HighlightedNodeField from './fields/highlighted-node';

export default class ClickventureEditStore extends Store {
}

Store.defineFields(ClickventureEditStore, {
  nodes: NodesField,
  highlightedNode: HighlightedNodeField,
});
