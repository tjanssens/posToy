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
COPY ["kassa-kindern/kassa-kindern.csproj", "kassa-kindern/"]
RUN dotnet restore "kassa-kindern/kassa-kindern.csproj"
COPY . .
WORKDIR "/src/kassa-kindern"
RUN dotnet build "kassa-kindern.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "kassa-kindern.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "kassa-kindern.dll"]