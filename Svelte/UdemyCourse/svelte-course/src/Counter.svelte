<script>
    // to create state in svelte we simply define new variable
    // unlike react state which will be re-rendered each time the
    // value of the state variable changes . The state components in svelte
    // only run once so we see that the value of the count increases during
    // function call ( due to function call )
    // but the string here which is inside the
    //let count1 = 0;
    //let count2 = 0;
    // let's say our string depends on count state
    //let string = `You have clicked ${count} times`;
    // this string value does not update unless we use reactive statement
    // we have something like this i.e., a varialbe that depends on a state
    // and this variable to update when state updates
    // we can use reactive statements the format is
    /* $: {
        console.log(`The count is ${count}`)
    }*/
    // this above statement runs every time when count changes
    // let's write this within reactive statements
    // any dependency on the reactive varialbe changes the statement inside
    // the $sign runs again and again
    // define your string in a reactive statement
    //let string;
    //$: {
    //   string = `You have clicked ${count} times.`;
    // }
    // you could also write your reactive variables like this
    function setCount2(x) {
        //count2 = x;
    }

    function getTotal(x, y) {
        return x + y;
    }

    //$: setCount2(count1); //$: string = `The count total is ${getTotal(count1, count2)}`;
    //$: string = `Count2 is ${count2}`;
    // the order here is important
    // we are using a function  so it does not update that's because the state variable
    // count1 and count2 must explicitly appear in the reactive statement
    // which is not the case when we are using a function to change those
    // so we pass it as a function argument
    // in
    // this gives the correct version of the count but let's say we created a function
    // that counts instead of adding it realtime

    // $: if (count > 5) {
    //    console.log(`The count is ${count}`);
    // }

    // creating props in svelte

    // to create a prop in svelte just use the export
    // variable
    export let initialCount; // this is a prop really :)
    export let maxCount = 11;
    // if you dont want to use this as a prop argument in a component
    // where it's been imported then you
    // can explicity declare it
    // but the value inside the prop argument will win .) if you know what i mean

    let count = initialCount;
    // here we try to print the props
    console.log($$props, $$restProps);
    // rest props will be any other props that is passed
    // it is not defined in any other component

    function increment() {
        if (count === maxCount) return;
        count += 1;
    }
    function increment2() {
        //count2 += 1;
    }
</script>

<button on:click={increment}> Clicks{count}</button>
<!--button on:click={increment}>Clicks{count}</button!-->
<h3>"Chad"</h3>

<style>
    button {
        padding: 15px;
    }
</style>
