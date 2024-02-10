<script setup lang="ts">
import { ref } from "vue";

const selectedVehicle = ref();
const vehicle = ref([
    { name: 'Vehiculo 1', code: '1' },
    { name: 'Vehiculo 2', code: '2' },
    { name: 'Vehiculo 3', code: '3' },
]);
</script>
<template>
    <div style="display:flex; align-items:center; justify-content: space-around;">
        <h1>Tablero</h1>
        <DropDown v-model="selectedVehicle" :options="vehicle" optionLabel="name" placeholder="Seleccione el vehiculo" class="w-full md:w-14rem" />
    </div>
    
    <div class="cont">
        <div>
            <div class="icons">
                <FA style="font-size: 2rem;" icon="car-on" class="on" />
                <FA style="font-size: 2rem;" icon="car-rear" class="off" />
                <FA style="font-size: 2rem;" icon="gas-pump" class="on" />
                <FA style="font-size: 2rem;" icon="car-battery" class="on" />
                <FA style="font-size: 2rem;" icon="caret-left" class="off" />
                <FA style="font-size: 2rem;" icon="caret-right" class="on" />
            </div>

            <div id="dashboard">
                <div id="revmeter">
                    <div class="gauge" style="--rpm: 750; --limiter: 6700; --gauge-value: var(--rpm) / 1000;">
                        <div class="digit">
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>

                            <div class="label">0</div>
                        </div>
                        <div class="digit">
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>

                            <div class="label">1</div>
                        </div>
                        <div class="digit">
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>

                            <div class="label">2</div>
                        </div>
                        <div class="digit">
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>

                            <div class="label">3</div>
                        </div>
                        <div class="digit">
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>

                            <div class="label">4</div>
                        </div>
                        <div class="digit">
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>

                            <div class="label">5</div>
                        </div>
                        <div class="digit">
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="highlighted line"></span>
                            <span class="highlighted line"></span>
                            <span class="highlighted line"></span>

                            <div class="label">6</div>
                        </div>
                        <div class="digit">
                            <span class="highlighted line"></span>
                            <span class="highlighted line"></span>
                            <span class="highlighted line"></span>
                            <span class="highlighted line"></span>
                            <span class="separating line"></span>
                            <span class="highlighted line"></span>
                            <span class="highlighted line"></span>
                            <span class="highlighted line"></span>
                            <span class="highlighted line"></span>

                            <div class="label">7</div>
                        </div>
                        <div class="digit">
                            <div class="label">8</div>
                        </div>

                        <div class="limiter"></div>

                        <div class="pointer">
                            <div class="hand"></div>
                        </div>

                        <div class="gear"></div>
                    </div>

                </div>

                <div id="speedmeter">
                    <div class="gauge"
                        style="--kmh: 0; --start-angle: 0deg; --digits-angle: 30deg; --lines-count: 6; --digits-count: 10; --gauge-value: var(--kmh) / 30;">

                        <div class="digit">
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>

                            <div class="label">0</div>
                        </div>

                        <div class="digit">
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="highlighted separating line"></span>
                            <span class="line"></span>

                            <div class="label">30</div>
                        </div>

                        <div class="digit">
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>

                            <div class="label">60</div>
                        </div>

                        <div class="highlighted digit">
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>

                            <div class="label">90</div>
                        </div>

                        <div class="digit">
                            <span class="line"></span>
                            <span class="highlighted separating line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>

                            <div class="label">120</div>
                        </div>

                        <div class="digit">
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>

                            <div class="label">150</div>
                        </div>

                        <div class="digit">
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>

                            <div class="label">180</div>
                        </div>

                        <div class="digit">
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>

                            <div class="label">210</div>
                        </div>

                        <div class="digit">
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>
                            <span class="separating line"></span>
                            <span class="line"></span>

                            <div class="label">240</div>
                        </div>

                        <div class="digit">
                            <div class="label">270</div>
                        </div>

                        <div class="pointer">
                            <div class="hand"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="circulo">
            <div class="carretera">
                <div class="linea"></div>
                <img src="../../src/assets/car.png" class="car">
            </div>
        </div>
    </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Changa+One:400,400i');

html {
    font-size: 30px;
}

body {
    background: black;
    color: white;
    font-family: 'Open Sans', sans;
}

.gauge {
    --start-angle: -30deg;
    --digits-angle: 30deg;
    --lines-count: 10;
    --digits-count: 8;
    --gauge-value: 0;

    position: relative;
    border: 0.2rem solid #137;
    border-radius: 100%;
    box-shadow: inset 0 0 0.25rem 0.25rem #137, inset 0 0 7.5rem rgba(40, 101, 224, 0.5);
    width: 100%;
    height: 100%;
    background-color: #040b10;
    overflow: hidden;

    &::before {
        padding-top: 100%;
        content: '';
        display: block;
    }

    &::after {
        font-size: 0.5rem;
        font-weight: bold;
        display: block;
        content: '';
        position: absolute;
        top: 25%;
        width: 100%;
        text-align: center;
    }


    .pointer {
        z-index: 4;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        &::before {
            content: '';
            display: block;
            box-sizing: border-box;
            position: absolute;
            width: 22%;
            height: 22%;
            left: 39%;
            top: 39%;
            border-radius: 100%;
            box-shadow:
                inset 0 0 1rem 1px rgba(51, 153, 255, 0.5),
                0 0 5rem 0.1rem #137;
        }

        .hand {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            transform-origin: center center;
            transform: rotate(calc(var(--start-angle) + (var(--gauge-value) * var(--digits-angle))));
            transition: transform ease 0.2s;


            &::after {
                content: '';
                display: block;
                box-sizing: border-box;
                position: absolute;
                width: 39%;
                height: 2%;
                top: 49%;
                right: 56%;
                background: #fff;
                border: 1px solid #fff;
                border-right: 0;
                border-bottom-left-radius: 1.7rem 0.25rem;
                border-top-left-radius: 1.7rem 0.25rem;
                box-shadow: inset 0px 0 1px #000;
                z-index: 1;
            }

            &::before {
                content: '';
                display: block;
                border: 1px solid #fff;
                position: absolute;
                width: 12%;
                height: 5.5%;
                left: 44%;
                top: 47.25%;
                box-sizing: border-box;
                border-radius: 20%;
                background: #e6e7e8;
                box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.25);
                z-index: 0;
            }
        }
    }

    .digit {
        position: absolute;
        top: 49.375%;
        right: 50%;
        width: 50%;
        height: 1.25%;
        border-left: 1.1rem solid white;
        transform-origin: center right;
        box-sizing: border-box;
        z-index: 1;
        --digit-rotation: calc(var(--start-angle) + var(--digit-order) * var(--digits-angle));
        transform: rotate(var(--digit-rotation));

        .label {
            transform: rotate(calc(-1 * var(--digit-rotation)));

            &:not(:root:root) {
                transform: rotate(calc(-1 * (var(--start-angle) + var(--digit-order) * var(--digits-angle))));

            }
        }

        &:nth-of-type(1) {
            --digit-order: 0;
        }

        &:nth-of-type(2) {
            --digit-order: 1;
        }

        &:nth-of-type(3) {
            --digit-order: 2;
        }

        &:nth-of-type(4) {
            --digit-order: 3;
        }

        &:nth-of-type(5) {
            --digit-order: 4;
        }

        &:nth-of-type(6) {
            --digit-order: 5;
        }

        &:nth-of-type(7) {
            --digit-order: 6;
        }

        &:nth-of-type(8) {
            --digit-order: 7;
        }

        &:nth-of-type(9) {
            --digit-order: 8;
        }

        &:nth-of-type(10) {
            --digit-order: 9;
        }

        &:nth-of-type(11) {
            --digit-order: 10;
        }

        .label {
            position: absolute;
            font-family: 'Changa One', cursive;
            font-style: italic;
            font-size: 1rem;
            bottom: -0.5rem;
            left: 7%;
            text-shadow:
                0.1rem 0.1rem 0.1rem black,
                0.1rem -0.1rem 0.1rem black,
                -0.1rem 0.1rem 0.1rem black,
                -0.1rem -0.1rem 0.1rem black;
            box-shadow: 0 0 1rem 1rem rgba(195, 225, 255, 0.05);
            background: rgba(255, 255, 255, 0.05);
        }

        &.highlighted {
            border-left-color: red;
        }


        .line {
            position: absolute;
            display: block;
            width: 100%;
            height: 50%;

            border-left: 0.5rem solid white;
            border-right: 0.5rem solid transparent;
            left: -1rem;
            top: 25%;
            transform: rotate(calc(var(--digits-angle) / var(--lines-count) * var(--line-order)));

            transform-origin: center right;

            &.highlighted {
                border-left-color: red;
            }

            &.separating {
                top: 12.5%;
                height: 75%;

                &::after {
                    content: '';
                    display: block;
                    border-left: 2.5rem solid rgba(255, 255, 255, 0.15);
                    border-top: 0.075rem solid transparent;
                    border-bottom: 0.075rem solid transparent;
                    width: 0;
                    height: 0;
                    position: absolute;
                    left: 0.25rem;
                }
            }

            /* max 15 segements in main area */
            &:nth-child(1) {
                --line-order: 1;
            }

            &:nth-child(2) {
                --line-order: 2;
            }

            &:nth-child(3) {
                --line-order: 3;
            }

            &:nth-child(4) {
                --line-order: 4;
            }

            &:nth-child(5) {
                --line-order: 5;
            }

            &:nth-child(6) {
                --line-order: 6;
            }

            &:nth-child(7) {
                --line-order: 7;
            }

            &:nth-child(8) {
                --line-order: 8;
            }

            &:nth-child(9) {
                --line-order: 9;
            }

            &:nth-child(10) {
                --line-order: 10;
            }

            &:nth-child(11) {
                --line-order: 11;
            }

            &:nth-child(12) {
                --line-order: 12;
            }

            &:nth-child(13) {
                --line-order: 13;
            }

            &:nth-child(14) {
                --line-order: 14;
            }
        }
    }

    .limiter {
        width: 100%;
        height: 50%;
        position: absolute;
        top: 0;
        left: 0;
        transform-origin: bottom center;
        transform: rotate(calc(var(--start-angle) + var(--digits-count) * var(--digits-angle) - 180deg));
        overflow: hidden;
        z-index: 0;

        &::after {
            content: '';
            width: 99.5%;
            height: 199%;
            border: 0.6rem solid;
            border-color: transparent red red transparent;
            border-radius: 100%;
            display: block;
            box-sizing: border-box;
            transform: rotate(calc(45deg + var(--digits-angle) * (var(--limiter) / 1000 - var(--digits-count))));
        }
    }
}


#speedmeter {
    margin: 1rem 2rem;
    width: 15rem;
    display: inline-block;

    .gauge {
        &::after {
            content: 'km/h';
        }

        .pointer::after {
            counter-reset: kmh var(--kmh);
            content: counter(kmh) " km/h";
            color: #fff;
            top: 65%;
            left: 0;
            right: 0;
            text-align: center;
            display: block;
            position: absolute;
            font-size: 0.5rem;
        }
    }
}

#revmeter {
    margin: 1rem 2rem;
    width: 15rem;
    display: inline-block;

    .gauge {
        &::after {
            content: 'x1000r/min';
        }

        .label {
            font-size: 1.4rem;
            bottom: -0.7rem;
            left: 10%;
        }

        .pointer::after {
            font-family: 'Changa One', cursive;
            font-style: italic;
            counter-reset: gear var(--gear);
            content: counter(gear);
            color: #99c459;
            top: 70%;
            left: 0;
            right: 0;
            text-align: center;
            display: block;
            position: absolute;
            font-size: 1rem;
        }
    }
}

#controls {
    position: fixed;
    right: 0;
    top: 0;
    width: 7rem;
    font-size: 16px;

    input[type=range] {
        transform: rotate(180deg);
    }
}

#dashboard {
    display: flex;
    justify-content: center;
    align-items: center;
}

h3 {
    text-align: center;
}

.icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 300px;
    gap: 10px;
    margin: 0 auto;
}

.on {
    color: #00ff00;

    filter: drop-shadow(0 0 0.5rem #00ff00);

}

.off {
    color: #1f2937;
}

.circulo {
    width: 270px;
    height: 270px;
    border-radius: 50%;
    background-color: #1f2937;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.carretera {
    width: 150px;
    height: 100%;
    position: relative;
    background-color:black;
    display: flex;
    justify-content: center;    
    align-items: center;
}

.linea {
    width: 4px;
    height: 100%;
    background-color: white;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    animation: mover-linea 2s linear infinite;
}

@keyframes mover-linea {
    0% {
        top: 0;
    }

    100% {
        top: 100%;
    }
}

.car {
    width: 130%;
    position: absolute;
    bottom: 0;
    transform: translateX(-50%);
    animation: mover-auto 2s linear infinite;
}

@keyframes mover-auto {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-50px);
    }

    100% {
        transform: translateY(0);
    }
}

.cont {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 0px;
}
</style>