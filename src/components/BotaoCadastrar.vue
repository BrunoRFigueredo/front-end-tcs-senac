<template>
    <button class="shiny-button">Novo</button>
</template>

<style>
    .shiny-button {
    display: inline-block;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    text-transform: uppercase;
    text-decoration: none;
    line-height: 1.1;
    font-weight: normal;
    font-family: sans-serif;
    color: #FFFFFF;
    font-size: 12px;
    background-color: #363122;
    background-image: -webkit-linear-gradient(top, #393424 0%, #42413f 48%, #363122 49%, #363122 82%, #47412d 100%);
    background-image: -moz-linear-gradient(top, #393424 0%, #42413f 48%, #363122 49%, #363122 82%, #47412d 100%);
    background-image: -o-linear-gradient(top, #393424 0%, #42413f 48%, #363122 49%, #363122 82%, #47412d 100%);
    background-image: linear-gradient(top, #393424 0%, #42413f 48%, #363122 49%, #363122 82%, #47412d 100%);
    border-color: hsl(0, 0%, 17%);
    -webkit-box-shadow: inset 0 0 1px 1px #756a49, 0 0 1px 3px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: inset 0 0 1px 1px #756a49, 0 0 1px 3px rgba(0, 0, 0, 0.15);
    box-shadow: inset 0 0 1px 1px #756a49, 0 0 1px 3px rgba(0, 0, 0, 0.15);
    -webkit-text-shadow: 1px 1px 1px #000;
    -moz-text-shadow: 1px 1px 1px #000;
    -o-text-shadow: 1px 1px 1px #000;
    text-shadow: 1px 1px 1px #000;
    -webkit-border-radius: 5px;
    -moz-border-radius: 25px;
    padding: 12px 30px 12px 30px;
    }

    .shiny-button strong {
    letter-spacing: 1px;
    font-size: 22px;
    }

    .shiny-button:hover {
    color: #FFFFFF;
    background-color: black;
    background-image: -webkit-linear-gradient(top, #423d2a 0%, #4a4946 48%, #3f3a28 49%, #3f3a28 82%, #504a33 100%);
    background-image: -moz-linear-gradient(top, #423d2a 0%, #4a4946 48%, #3f3a28 49%, #3f3a28 82%, #504a33 100%);
    background-image: -o-linear-gradient(top, #423d2a 0%, #4a4946 48%, #3f3a28 49%, #3f3a28 82%, #504a33 100%);
    background-image: linear-gradient(top, #423d2a 0%, #4a4946 48%, #3f3a28 49%, #3f3a28 82%, #504a33 100%);
    border-color: hsl(0, 0%, 20%);
    -webkit-box-shadow: inset 0 0 1px 1px #7a714e, 0 0 1px 3px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: inset 0 0 1px 1px #7a714e, 0 0 1px 3px rgba(0, 0, 0, 0.15);
    box-shadow: inset 0 0 1px 1px #7a714e, 0 0 1px 3px rgba(0, 0, 0, 0.15);
    -webkit-text-shadow: 1px 1px 1px #010100;
    -moz-text-shadow: 1px 1px 1px #010100;
    -o-text-shadow: 1px 1px 1px #010100;
    text-shadow: 1px 1px 1px #010100;
    }

    .shiny-button:active {
    color: #FFFFFF;
    background-color: black;
    background-image: -webkit-linear-gradient(top, #272218 0%, #363122 100%);
    background-image: -moz-linear-gradient(top, #272218 0%, #363122 100%);
    background-image: -o-linear-gradient(top, #272218 0%, #363122 100%);
    background-image: linear-gradient(top, #272218 0%, #363122 100%);
    padding: 13px 30px 11px 30px;
    }
</style>