var view = ko.views.manager.currentView;
var tabbox = view.parentNode;
while (tabbox && tabbox.nodeName != "tabbox" && tabbox.nodeName != "xul:tabbox") {
    tabbox = tabbox.parentNode;
}

// Vertical tabs
tabbox.setAttribute("orient", "horizontal");
tabbox.setAttribute("dir", "reverse");
tabbox.tabs.setAttribute("orient", "vertical");

// tooltipText

var tabNames = {};
var childNodes = tabbox._tabs.childNodes;
var bits;
for (var i = 0;  i < childNodes.length; i++) {
	var tab = childNodes[i];
	
	bits = tab.tooltipText.split(".");
	tab.rel = bits[bits.length-1];
	
	bits = tab.tooltipText.split("/");
	tab.label = bits[bits.length-1];
	
	checkTabName(tab, tabNames);
}

// Sort tabs alphabetically
for (var i = 0;  i < childNodes.length; i++) {
    for (var j = childNodes.length - 1; j > i; j--) {
        if (isBelow(childNodes[j].label,childNodes[j-1].label.substr(0,1))) {
            tabbox._tabs.insertBefore(childNodes[j], childNodes[j-1])
        }
        if (isBelow(childNodes[j].rel,childNodes[j-1].rel)) {
            tabbox._tabs.insertBefore(childNodes[j], childNodes[j-1])
        }
    }
}

// Add margin between groups
var curType = null;
for (var j = 0;  j < childNodes.length; j++) {
    var style = childNodes[j].getAttribute('style');
    childNodes[j].setAttribute('style',style + ' border-top: 1px solid #AAAAAA !important; margin-top: 0px !important;')
    
    if (childNodes[j].rel!=curType) {
		style = childNodes[j].getAttribute('style');
		var margin = curType == null ? 0 : 5;
		childNodes[j].setAttribute('style',style + ' border-top: 2px solid !important; border-color: ' + strToHexColor(childNodes[j].rel) + ' !important; margin-top: '+margin+'px !important;')	
    }
        
    curType = childNodes[j].rel;
}

function checkTabName(tab, tabNames)
{
	if (tabNames[tab.label] == undefined)
	{
		tabNames[tab.label] = tab;
		return;
	}
	
	var tabExist = tabNames[tab.label];
	
	delete tabNames[tab.label];
	
	var tabNameNew, tabNameExist;
	for (var i=1;i<=5;i++)
	{
		tabNameNew = tabName(tab.tooltipText, i);
		tabNameExist = tabName(tabExist.tooltipText, i);
		
		if (tabNameNew != tabNameExist)
			break;
	}
	
	if (tabNameNew == tabNameExist)
	{
		return;
	}
	
	tab.label = tabNameNew;
	tabNames[tab.label] = tab;
	
	tabExist.label = tabNameExist;
	tabNames[tabExist.label] = tabExist;
}

function tabName(tooltip, depth)
{
	var bits = tooltip.split("/");
	var name = bits[bits.length-1] + " - ";
	
	var nameBits = [];
	for (var i=0;i<depth;i++)
		nameBits.push(bits[bits.length-(2 + i)]);
	
	if (nameBits.join("").length > 20)
	{
		for (var i=0;i<nameBits.length;i++)
		{
			nameBits[i] = nameBits[i].substr(0,4) + "..";
		}
	}
	
	return name + nameBits.join("/");
}


function isBelow(str1,str2) {
    if (str1===undefined || str2===undefined) return false;
    length = str1.length > str2.length ? str2.length : str1.length;
    for (var i=0; i < length; i++) {
        if (str1.substr(i,i+1)==str2.substr(i,i+1))
            continue;
        
        if (parseInt(str1.substr(i,i+1),36) < parseInt(str2.substr(i,i+1),36))
            return true;
        
        return false;
    }
    return false;
}

function strToHexColor(str) {
    if (str===undefined) str = 'undefined';
    var nr = 1000000000;
    for (var i=0; i < str.length; i++) {
        nr = nr + parseInt(str.substr(i,i+1),36);
    }
    
    return '#' + nr.toString(16).toUpperCase().substring(1,7);
}