// To create accessibility options for the Blind Students

document.addEventListener("DOMContentLoaded", function(){
	// list all anchor tags
	var list = document.getElementsByTagName("a");

	// removing duplicates, skip options and link to moodle site
	let hrefArr = [];
	let textArr = [];
	for (var i = 0; i < list.length; i++)
	{
		if(list[i].href.trim() != '' && list[i].text.trim() != '' && !list[i].href.includes("#") && !list[i].href.includes("moodle.org") && !list[i].href.includes("redirect=0"))
		{
			if(hrefArr.indexOf(list[i].href) == -1)
			{
				// setting the access key for Log in as 'l' 
				if(list[i].text == 'Log in')
				{
					list[i].setAttribute('accesskey', 'l');
				}
				hrefArr.push(list[i].href);
				textArr.push(list[i].text);
			}
		}
	}
	
	// setting home page link to the first place and remove it form the end
	hrefArr[0] = hrefArr[hrefArr.length-1];
	textArr[0] = textArr[textArr.length-1];
	hrefArr.pop();
	textArr.pop();
	
	// display list of options
	var optModal = document.getElementById("modal-body");
	var strCustom = '';
	for (var i = 0; i < hrefArr.length; i++)
	{
		// setting a custom label for each
		var frontLbl = '';
		var strURL = hrefArr[i];

		switch(true)
		{
			case strURL.includes("/user/"):
				frontLbl = 'User Block';
				break;
			case strURL.includes("/grade/"):
				frontLbl = 'Report Block';
				break;
			case strURL.includes("/message/"):
				frontLbl = 'Message Block';
				break;
			case strURL.includes("/course/"):
				frontLbl = 'Course Block';
				break;
			case strURL.includes("/assign/"):
				frontLbl = 'Assignment';
				break;
			case strURL.includes("/calendar/"):
				frontLbl = 'Calendar Block';
				break;
			case strURL.includes("/time=/"):
				frontLbl = 'Calendar Block';
				break;
			default:
				frontLbl = 'Site';
		} 		
		//strCustom +=  strURL + " : " + textArr[i] + "<br />";
		strCustom +=  (i+1) + ") <a href='" + strURL + "'>" + frontLbl + ": " + textArr[i] + "</a><br />";
	}
	optModal.innerHTML = strCustom;
	
	// list all buttons
	var blist = document.getElementsByTagName("button");
	//alert(blist.length);
	
	// removing unwanted buttons
	let btnArr = [];
	for (var i = 1; i < blist.length; i++)
	{
		if(!blist[i].textContent.includes("Close") && !blist[i].textContent.includes("Exit") && !blist[i].textContent.includes("Navigation Options") && !blist[i].textContent.includes("Get Buttons"))
		{
			btnArr.push(blist[i]);
		}
	}
	
	//alert(btnArr.length);
	if(btnArr.length > 0)
	{
		var optModal1 = document.getElementById("modal1-body");
		var strCustom1 = '';
		
		for (var i = 0; i < btnArr.length; i++)
		{
			// setting a custom accesskey for each
			var strCaption = btnArr[i].textContent;
			var strAccessKey = btnArr[i].textContent.charAt(0).toLowerCase();
			var btn = document.getElementById(btnArr[i].id);

			if(btn.getAttribute('accesskey') == '' || btn.getAttribute('accesskey') == null)
			{
				btn.setAttribute('accesskey', strAccessKey);
			}
			
			// generating a list of buttons with accesskeys
			//strCustom1 +=  strCaption + " : " + strAccessKey + "<br />";
			strCustom1 +=  (i+1) + ") <a href='void(0);'>Button: " + strCaption + ", Access Key: '" + strAccessKey + "'</a> <br />";
		}
		optModal1.innerHTML = strCustom1;
	}
	
	// list all images
	var ilist = document.getElementsByTagName("img");
	//alert(ilist.length);
	
	// removing images which doesn't contain "alt" attribute and setting "title" attribute
	for (var i = 0; i < ilist.length; i++)
	{
		if(ilist[i].getAttribute('alt').trim() != '' && ilist[i].getAttribute('alt').trim() != null)
		{
			//alert(ilist[i].getAttribute('alt'));
			ilist[i].setAttribute('title', ilist[i].getAttribute('alt'));
		}
	}
	
	// list all table
	var tlist = document.getElementsByTagName("table");
	//alert(tlist.length);
	
	// removing tables which doesn't contain "<caption>" tag and setting "summary" attribute
	for (var i = 0; i < tlist.length; i++)
	{
		// getting the no. of rows and columns in the table
		var trows = tlist[i].rows.length;
		var tcols = tlist[i].rows[0].cells.length;
		
		// getting the column headers 
		let tcolhead = [];
		for (var c = 0; c < tcols; c++)
		{
			tcolhead.push(tlist[i].rows[0].cells[c].innerHTML);
		}
		var chead = tcolhead.join(", ");
		//alert(trows);
		//alert(tcols);
		//alert(chead);
		
		if(tlist[i].caption.innerHTML.trim() != '' && tlist[i].caption.innerHTML.trim() != null)
		{
			//alert(tlist[i].caption.innerHTML);
			tlist[i].setAttribute('summary', tlist[i].caption.innerHTML.trim());
			
			// adding table info to summary
			var summary = tlist[i].getAttribute('summary').trim();
			summary += '. This table has ' + trows + ' rows and ' + tcols + ' columns.';
			summary += ' Column headings are ' + chead + '.';
			tlist[i].setAttribute('summary', summary);
		}
	}
});