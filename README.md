PowerShell
npm i -g npm@latest
npm i -g @angular/cli@latest

dotnet --version
Make sure 3.1 is installed on your system

cd "[Parent Dir]"
mkdir "[Root Dir for your new project]"
cd "[Root Dir for your new project]"

mkdir SignalR.Api
cd SignalR.Api

Create .NET Core solution
dotnet new sln --name "SignalR.Api"

Create Web API project
dotnet new web --name "SignalR.API" --dry-run
dotnet new web --name "SignalR.API"

Add project to solution
dotnet sln add SignalR.Api/SignalR.Api.csproj

Create Angular project
cd ..
ng new SignalR-Ui --directory "SignalR.Ui" --routing true --prefix dlm  --style scss --strict true --skipGit --commit false

Initialize Git repo
git init
git add .
git commit -m "initial commit"
git remote add origin [git repo url]
git push --set-upstream origin master

Add Microsoft.AspNetCore.SignalR
cd into the project directory
`dotnet add package Microsoft.AspNetCore.SignalR`

