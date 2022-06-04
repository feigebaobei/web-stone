<script>
    let name = 'tom'
    let pClickHandler = (param) => {
        console.log('param', param)
        name += 'a'
    }
    let selected = 2;
    let clog = console.log
    let selectChangeHandler = (e) => {
        clog('selectChangeHandler', e)
    }
    let questions = [
		{ id: 1, text: `Where did you go to school?` },
		{ id: 2, text: `What is your mother's name?` },
		{ id: 3, text: `What is another personal fact that an attacker could easily find with Google?` }
	];
</script>

<p
    on:mousedown={(e) => {
        console.log(e);
        pClickHandler('str')
    }}
>hi {name}</p>
<p>string</p>
<select bind:value={selected} on:change={selectChangeHandler}>
    {#each questions as question}
        <option value={question}>{question.text}</option>
    {/each}
</select>

<style>
    p {
        color: red;
    }
</style>