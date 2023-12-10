// Q.1 Props
// Parent.js
import Child from './Child';

const Parent = () => {
  const data = 'parent message';

  return (
    <div>
      <Child message={data} />
    </div>
  );
};

// Child.ja
const Child = (props) => {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  );
};

// Q.1 States
class counter {
  constructor() 
  {
    // manages the state i.e. count of the component; sets it to 0
    this.state = { count: 0 };
  }

  incrementer = () =>
  {
    // manages the state i.e. count of the component by increasing it every time the function is called
    this.setState({ count: this.state.count + 1 });
  };

  // the button calls the function which changes the state of the component
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementer}>Increment</button>
      </div>
    );
  }
}

// Q.2 Functor
const my_num = [3, 4, 7];

// Addition function to be applied
const my_func = (val) => val + val;

// Performs the function to each value
const total = my_num.map(my_func);

// It will output [6, 8, 14]
