/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace StepperHome {
    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */
    //% block
   function goHome() {
    pins.digitalWritePin(DigitalPin.P2, 1)  // set direction
    while (home == 0) {
        if (pins.digitalReadPin(DigitalPin.P0) == 0) {
            home = 1
        } else {
            home = 0
        }
        for (let index = 0; index < 100; index++) {
            pins.digitalWritePin(DigitalPin.P1, 0)
            control.waitMicros(500)
            pins.digitalWritePin(DigitalPin.P1, 1)
            control.waitMicros(500)
        }
    }
    location = 0
}
    /**
       * TODO: describe your function here
       * @param Steps number of steps to move forward
       */
    //% block
    function goForward(Steps: number) {
        pins.digitalWritePin(DigitalPin.P2, 0)
        for (let index = 0; index < Steps; index++) {
            location += 1
            if (maxLocation >= location) {
                for (let index = 0; index < 100; index++) {
                    pins.digitalWritePin(DigitalPin.P1, 0)
                    control.waitMicros(200)
                    pins.digitalWritePin(DigitalPin.P1, 1)
                    control.waitMicros(200)
                }
            }
        }
    }

function goBackwards(steps: number) {
    pins.digitalWritePin(DigitalPin.P2, 1)
    location = location - steps
    for (let index = 0; index < steps; index++) {
        if (pins.digitalReadPin(DigitalPin.P0) == 0) {
            home = 1
            location = 0
        } else {
            home = 0
            for (let index = 0; index < 100; index++) {
                pins.digitalWritePin(DigitalPin.P1, 0)
                control.waitMicros(200)
                pins.digitalWritePin(DigitalPin.P1, 1)
                control.waitMicros(200)
            }
        }
    }
}
let location = 0
let maxLocation = 0
let home = 0
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
pins.digitalWritePin(DigitalPin.P9, 0)
home = 0
maxLocation = 800
basic.showIcon(IconNames.Yes)
basic.pause(200)
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P0) == 0) {
        home = 1
    } else {
        home = 0
    }
    basic.showNumber(home)
    basic.pause(10)
})
}