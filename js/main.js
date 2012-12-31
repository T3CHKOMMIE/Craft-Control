

function init()
{
	if(System.Gadget.Settings.readString("refreshTime")=="" || System.Gadget.Settings.readString("refreshTime")==0  ){
	System.Gadget.Settings.writeString("refreshTime", 30000);
	}
		
	doSomething();
	System.Gadget.settingsUI = '../settings.html';
	//default launcher path
	if(System.Gadget.Settings.readString("launcherPath")==""){
	System.Gadget.Settings.writeString("launcherPath", System.Gadget.path+'\\Minecraft.exe');
	}
	if(System.Gadget.Settings.readString("soundPath")==""){
	System.Gadget.Settings.writeString("soundPath", System.Gadget.path+"\\sounds\\portal.wav");
	}
	
}
function doSomething() {
        refresh();
		
		setTimeout(doSomething, System.Gadget.Settings.readString("refreshTime"));
    }



function minecraft()
{   
	//System.Shell.execute(System.Gadget.path+'\\Minecraft.exe');
	//Dynamic Launch URL
	System.Shell.execute(System.Gadget.Settings.readString("launcherPath"));
}


function refresh()
{  
	System.Shell.execute(System.Gadget.path+'\\mcgadget.exe');
	wait(4000);
	refreshGadget();
	wait(1000);
	findPlayers();
	
}



// launch cosloe "RCON"
function rconsole()
{   
    
	System.Shell.execute(System.Gadget.path+'\\rcon\\RCON.exe');


}
