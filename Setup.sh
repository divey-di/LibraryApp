#!/bin/sh

echo "cd into Infra Project"
cd src/Infrastructure

echo "setup db"
dotnet ef migrations add SetupMigration --verbose --project . --startup-project ../WebUI/. -o Persistence/Migrations
dotnet ef database update --verbose --project . --startup-project ../WebUI/. 

echo "building Infra Project"
dotnet build

echo "cd into WebUI Project"
cd ../WebUI

echo "building all Projects"
dotnet build