/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

/**
 * Stepper blocks
 *  control NEMA 17 stepper conected to Miccro Stepper
 *  https://www.amazon.com/gp/product/B07PNZRPQH/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1
 *  12V power, 
 *  3 pins are needed
 *      Home dections switch
 *      driver direction
 *      driver pulse
 *      Driver always enabled
 * 
 */
//% weight=100 color=#0fbc11 icon=""
namespace stepperHome {

    // varibles    
    let stepperDirectionPin: DigitalPin = 0
    let stepperHomePin: DigitalPin = 0
    let stepperPulsePin: DigitalPin = 0
    let stepperLocation: number = 0
    let stepperMaxLocation: number = 800
    let stepperHome: number = 0

    /**
     * describe your function here
     * @param Pin for Direction
    */
    //% block="Set Pins For Stepper:  Home %homePin Dir+ %directioPin Pul+ %pulsePin"
    export function initParams(homePin: DigitalPin, directionPin: DigitalPin, pulsePin: DigitalPin): void {
        stepperDirectionPin = directionPin
        stepperHomePin = homePin
        stepperPulsePin = pulsePin
        pins.setPull(stepperHomePin, PinPullMode.PullUp)
        pins.digitalWritePin(stepperDirectionPin, 0)
    }

    /**
     * describe your function here
     */
    //% block="Stepper is at Home"
    export function getHome(): number {
        if (pins.digitalReadPin(stepperHomePin) ==0) {
            stepperHome = 1
        }
        else {
            stepperHome = 0
        }
        return stepperHome
       
    }



    /**
     * describe your function here
     */
    //% block="Move to Home position"
    export function goHome() {
        pins.digitalWritePin(stepperDirectionPin, 1)  // set direction
        while (stepperHome == 0) {
            if (pins.digitalReadPin(stepperHomePin) == 0) {
                stepperHome = 1
            } else {
                stepperHome = 0
            }
            for (let index = 0; index < 100; index++) {
                pins.digitalWritePin(stepperPulsePin, 0)
                control.waitMicros(500)
                pins.digitalWritePin(stepperPulsePin, 1)
                control.waitMicros(500)
            }
        }
        stepperLocation = 0
    }
    /**
     * TODO: describe your function here
     * @param Steps number of steps to move forward
     */
    //% block
    export function goForward(Steps: number) {
        pins.digitalWritePin(stepperDirectionPin, 0)        // set direction
        for (let index = 0; index < Steps; index++) {       // loop for number of steps
            if (stepperMaxLocation >= stepperLocation) {    // do not go past max location
                stepperLocation += 1                        // inc location if not past max                   
                for (let index = 0; index < 100; index++) { // 100 actual steps make 1 big step
                    pins.digitalWritePin(stepperPulsePin, 0)
                    control.waitMicros(200)
                    pins.digitalWritePin(stepperPulsePin, 1)
                    control.waitMicros(200)
                }

            }
        }
    }

    /**
         * TODO: describe your function here
        * @param Steps number of steps to move backwards
        */
    //% block
    export function goBackwards(steps: number) {
        pins.digitalWritePin(DigitalPin.P2, 1)
        stepperLocation = stepperLocation - steps           // location when done
        for (let index = 0; index < steps; index++) {       // loop for steps
            if (pins.digitalReadPin(stepperHomePin) == 0) { // check if home
                stepperHome = 1
                stepperLocation = 0
            } else {
                stepperHome = 0                             // no at home
                for (let index = 0; index < 100; index++) {
                    pins.digitalWritePin(stepperPulsePin, 0)
                    control.waitMicros(200)
                    pins.digitalWritePin(stepperPulsePin, 1)
                    control.waitMicros(200)
                }
            }
        }
    }
}
