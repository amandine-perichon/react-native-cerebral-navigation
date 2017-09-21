export default {
  state: {
    text: 'Kangaroo'
  },
  signals: {
    buttonClicked: [
      function (context) {
        const { props, navigation } = context;
        console.log(navigation);
        navigation.navigate(props.screen);
      }
    ]
  }
};
