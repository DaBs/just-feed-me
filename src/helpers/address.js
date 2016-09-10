export default {
  getAddressComponent: function(obj, component) {
    return obj.address_components.filter(item => {
      return item.types.filter(type => {
        return type === component;
      }).length > 0;
    })[0];
  }
}
