#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
# BEGIN MODIFICATION - Node is needed for development (but not production)
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install --assume-yes nodejs
# END MODIFICATION
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["posToy/posToy.csproj", "posToy/"]
RUN dotnet restore "posToy/posToy.csproj"
COPY . .
WORKDIR "/src/posToy"
RUN dotnet build "posToy.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "posToy.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "posToy.dll"]