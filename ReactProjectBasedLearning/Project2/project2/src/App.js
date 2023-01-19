import './App.css';
// this is an example of react components  and how to add props to it 
const Person=(props)=>{
  return (
    <>
    <h1>Name :{props.name}</h1>
    <h2> last Name:{props.lastName}</h2>
    <h2> Age:{props.age}</h2>
    </>
  )
}
// Props are a way of adding arguments , properties to react components 

const App =() => {
  //const name= 'Chad'
  const name=null
  //ternary variables 
  const isNameShowing = false;
  return (
    <div className="App">
      <Person name={'John'} lastName={'Bosco'} age={45}/>
      <h1> Hello, {isNameShowing?name :"someone"}</h1>
      {name? (
          <>
          test
          </>
         ) : (

          <>
          <h1> test</h1>
          <h2> THere is no name</h2>
          </>
         )}

      
    </div>
  );
}

export default App;
