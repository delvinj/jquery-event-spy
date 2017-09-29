# jquery-event-spy

This is a diagnostic tool that dumps jQuery events as they occur. 

## Usage

Run the script to begin watching. Run a second time to stop. Event information is printed to the browser console.

## Installation

I recommend using this script as a bookmarklet. This requires bookending the script with:

<table>
	<tr>
		<td>prefix</td>
		<td><code>`javascript:try{`</code></td>
	</tr>
	<tr>
		<td></td>
		<td>contents of <em>jquery-event-spy.js</em></td>
	</tr>
	<tr>
		<td>suffix</td>
		<td><code>`}catch(x){alert(x);}void 0`</code></td>
	</tr>
</table>

Save the resulting text to the *url* field of a new bookmark.

You can also run the script from the devtools console without the bookmarklet wrapper.

## Limitations

* Only triggered() events are shown; standard DOM events and event handlers are not collected.
* Framed documents are only supported for the same host as the main page.
