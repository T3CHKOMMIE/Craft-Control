

// обработчик события закрытия окна настроек
function settingsClosing(event) 
{
    if (event.closeAction == event.Action.commit) 
	{	
		if(!event.cancel) 
		{
			// сохранить все заданные настройки
			saveSettings();
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			var s = fso.CreateTextFile(System.Gadget.path + "\\serverfiles\\servers.txt", true);
			for (i=1; i<=5; i++)
			{
				if(System.Gadget.Settings.readString("server" + i + "name") == ""){
				s.WriteLine("*");
				}else{
				s.WriteLine(System.Gadget.Settings.readString("server" + i + "name")+" "+System.Gadget.Settings.readString("server" + i + "port"));
				
				}
			}
			s.WriteLine("<EOF>");
			s.Close();
			//write players page.
			/*var fso2 = new ActiveXObject("Scripting.FileSystemObject");
			var s2 = fso2.CreateTextFile(System.Gadget.path + "\\serverfiles\\players.txt", true);
			for (i=1; i<=5; i++)
			{
				s2.WriteLine("Watching for the following playesr on " +System.Gadget.Settings.readString("server" + i + "name"));
				if(System.Gadget.Settings.readString("p1s" + i ) != ""){
				s2.WriteLine(System.Gadget.Settings.readString("p1s" + i));
				}else{
				s2.WriteLine("*");
				}
				if(System.Gadget.Settings.readString("p2s" + i ) != ""){
				s2.WriteLine(System.Gadget.Settings.readString("p2s" + i));
				}else{
				s2.WriteLine("*");
				}
				if(System.Gadget.Settings.readString("p3s" + i ) != ""){
				s2.WriteLine(System.Gadget.Settings.readString("p3s" + i));
				}else{
				s2.WriteLine("*");
				
				}
			}
			s2.WriteLine("<EOF>");
			s2.Close();*/
		}
    }
	
}

// скрытие всех полей ввода для всех дней недели
function hideAllFields()
{
	// скрыть все поля ввода для всех дней недели
	// display: none
	Server1.style.display = 'none';
	Server2.style.display = 'none';
	Server3.style.display = 'none';
	Server4.style.display = 'none';
	Server5.style.display = 'none';
	
}

// показ полей для выбранного дня недели
function showFields(selectedDay)
{
	// показать поля ввода для какого-то дня недели
	// display: block
	hideAllFields();
	document.getElementById(selectedDay).style.display = 'block';
}

// выбор дня недели (вызывается при выборе дня из списка)
function selectServer()
{
	
	showFields(document.getElementById("server").value);
}

// сохранение информации о парах для какого-либо дня недели
function savePairs()
{
	for (i=1; i<=5; i++)
	{
		//server settings
		System.Gadget.Settings.writeString("server" + i + "name", document.getElementById("sn" + i).value);
		System.Gadget.Settings.writeString("server" + i + "port", document.getElementById("sp" + i).value);
		//watched player settings
		
		System.Gadget.Settings.writeString("p1s" + i, document.getElementById("namep1s" + i).value);
		System.Gadget.Settings.writeString("p2s" + i, document.getElementById("namep2s" + i).value);
		System.Gadget.Settings.writeString("p3s" + i, document.getElementById("namep3s" + i).value);
		//is watched or not...
		
		
		
		
	}
	if(document.getElementById("rtime").value*1000 == 0){
	System.Gadget.Settings.writeString("refreshTime", 30000);
	}
	else{
	System.Gadget.Settings.writeString("refreshTime", document.getElementById("rtime").value*1000);
	}
	
	//save launcher path
	//default launcher path
	if(document.getElementById("lpath").value==""){
	System.Gadget.Settings.writeString("launcherPath", System.Gadget.path+'\\Minecraft.exe');
	}
	else{
	System.Gadget.Settings.writeString("launcherPath", document.getElementById("lpath").value);
	}
	//default sound path
	if(document.getElementById("spath").value==""){
	System.Gadget.Settings.writeString("soundPath", System.Gadget.path+"\\sounds\\portal.wav");
	}
	else if(document.getElementById("spath").value=="*"){
	System.Gadget.Settings.writeString("soundPath", System.Gadget.path+"\\sounds\\silent.wav");
	}
	else{
	System.Gadget.Settings.writeString("soundPath", document.getElementById("spath").value);
	}
}

// восстановление информаци о парах для какого-либо дня недели
function restorePairs()
{
	for (i=1; i<=5; i++)
	{
		//server settings
		document.getElementById("sn" + i).value = System.Gadget.Settings.readString("server" + i + "name");
		document.getElementById("sp" + i).value = System.Gadget.Settings.readString("server" + i + "port");
		//watched player settings
		document.getElementById("namep1s" + i).value = System.Gadget.Settings.readString("p1s" + i );
		document.getElementById("namep2s" + i).value = System.Gadget.Settings.readString("p2s" + i );
		document.getElementById("namep3s" + i).value = System.Gadget.Settings.readString("p3s" + i );
		//checkboxes 
		
		
		
		
	}
	
	document.getElementById("rtime").value = (System.Gadget.Settings.readString("refreshTime"))/1000;
	//lacunher path
	document.getElementById("lpath").value = System.Gadget.Settings.readString("launcherPath");
	//sound path
	document.getElementById("spath").value = System.Gadget.Settings.readString("soundPath");
}

// сохранение настроек гаджета (информация о парах и четности недели)
function saveSettings()
{
	savePairs();


	// сохранить состояние четности недели
	// System.Gadget.Settings.writeString("URL", document.getElementById("PORT").checked.toString());
}

// восстановление настроек гаджета (информация о парах и четности недели)
function restoreSettings()
{
	// восстановить информацию о парах
	restorePairs();
	
	// восстановить состояние четности недели
	// document.getElementById("URL").checked = (System.Gadget.Settings.readString("URL") == "true") ? true : false;
}

// главная функция окна настроек
function main() 
{
	// установить обработчик закрытия окна
    System.Gadget.onSettingsClosing = settingsClosing;
	
	// восстановить значения настроек
	restoreSettings();
}