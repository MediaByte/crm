// https://wireframepro.mockflow.com/editor.jsp?editor=off&publicid=M10f2562067b22bbebd01be0ba6995f511555377621866&projectid=M93c5c9d9f368a3b02546fe072e14b48a1549844765299&perm=Reviewer#/page/D5d3b69f8bce0ccc9164aa40b91ceb415

/*
  Instead of receiving it as a prop, this will actually be stored in state.
  So access it through `state.nodes`.

  We'll have something similar to manually susbcribing to redux (or some other
  subscription thing) but with gun, so we subscribe on componentDidMount() and
  unsubscribe in componentWillUnmount(), and the subscription copies things to
  state on updates.

*/

const nodes = [
  {
    name: 'CAR', // secondary text
    label: 'Cars', // primary text
    _: {
      '#': Math.random().toString(), // this is  the id, you can use it as a react key
    },
  },
  {
    name: 'PERSON',
    label: 'People',
    _: {
      '#': Math.random().toString(),
    },
  },
  {
    name: '',
    label: '',
    _: {
      '#': Math.random().toString(),
    },
  },
  {
    name: 'SHOP',
    label: 'Shops',
    _: {
      '#': Math.random().toString(),
    },
  },
]
