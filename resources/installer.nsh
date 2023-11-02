!macro customInstall
SetRegView 64
WriteRegStr HKLM "Software\Rocket Client\1.5" "Last Run Location" "$INSTDIR\content\server_sa"
WriteRegStr HKLM "Software\Rocket Client\1.5" "Last Run Path" "$INSTDIR\Multi Theft Auto_d.exe"
WriteRegStr HKLM "Software\Rocket Client\1.5" "Last Run Path Hash" ""
WriteRegStr HKLM "Software\Rocket Client\1.5" "Last Run Path Version" "1.5n"
WriteRegStr HKLM "Software\Rocket Client\1.5" "OnQuitCommand" ""
WriteRegStr HKLM "Software\Rocket Client\1.5" "OnRestartCommand" "1.5.9-1.00000"
WriteRegStr HKLM "Software\Rocket Client\1.5" "PostUpdateConnect" "host=&time=1698877974"

WriteRegStr HKLM "Software\Rocket Client\Common" "File Cache Path" "$INSTDIR\content\server_sa\mods\deathmatch"
WriteRegStr HKLM "Software\Rocket Client\Common" "GTA:SA Path" "$INSTDIR\content\game_sa\"


SetRegView 32
WriteRegStr HKLM "Software\Rocket Client\1.5" "Last Run Location" "$INSTDIR\content\server_sa"
WriteRegStr HKLM "Software\Rocket Client\1.5" "Last Run Path" "$INSTDIR\Multi Theft Auto_d.exe"
WriteRegStr HKLM "Software\Rocket Client\1.5" "Last Run Path Hash" ""
WriteRegStr HKLM "Software\Rocket Client\1.5" "Last Run Path Version" "1.5n"
WriteRegStr HKLM "Software\Rocket Client\1.5" "OnQuitCommand" ""
WriteRegStr HKLM "Software\Rocket Client\1.5" "OnRestartCommand" "1.5.9-1.00000"
WriteRegStr HKLM "Software\Rocket Client\1.5" "PostUpdateConnect" "host=&time=1698877974"

WriteRegStr HKLM "Software\Rocket Client\Common" "File Cache Path" "$INSTDIR\content\server_sa\mods\deathmatch"
WriteRegStr HKLM "Software\Rocket Client\Common" "GTA:SA Path" "$INSTDIR\content\game_sa\"

!macroend

!macro customUnInstall
SetRegView 64

DeleteRegKey HKLM "Software\Rocket Client"

SetRegView 32
DeleteRegKey HKLM "Software\Rocket Client"

!macroend