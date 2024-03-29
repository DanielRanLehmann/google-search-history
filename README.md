# google-search-history
A chrome extension that helps you extract your google search history and download it in a variety of popular formats like: txt, csv and json. Visit, https://developer.chrome.com/extensions/history, for more information.

Installation
================

1) Download this git repository.
````
$ git clone git@github.com:DanielRanLehmann/google-search-history.git
````
2) Open Chrome and go to chrome://extensions

3) Lastly, drag and drop this repository into your extensions and install it.

Usage
===============
Pick a format, txt by default, and click the Download button.

Or you can optionally specify a couple of parameters: 
(Note: Table extracted from: https://developer.chrome.com/extensions/history)

| Parameter | Description | Type |
| --- | --- | --- |
| text | A free-text query to the history service. Leave empty to retrieve all pages. | string |
| startTime | Limit results to those visited after this date, represented in milliseconds since the epoch. If not specified, this defaults to 24 hours in the past. | double (epoch time) |
| endTime | Limit results to those visited before this date, represented in milliseconds since the epoch. | double (epoch time) |
| maxResults | The maximum number of results to retrieve. Defaults to 100. | integer |

You can also control what page attributes are included in your file:

| Name | Type |
| --- | --- |
| id | string |
| lastVisitTime | double (epoch time) |
| title | string |
| typedCount | integer |
| url | string |
| visitCount | integer |

Why is this not in the Chrome Web Store?
===============
For privacy reasons, and for the sake of complete transparency, you're highly encouraged to look through the code to get peace of mind in knowing that your search history **is not** mishandled, but that you have complete control over your data.

