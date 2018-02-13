import Base from './base';
import { alias } from '@ember/object/computed';

export default Base.extend({
  bill: alias('action.bill')
});
