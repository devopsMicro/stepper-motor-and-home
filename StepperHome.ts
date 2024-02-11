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
 * need to add max steps
 */
//% weight=100 color=#0fbc11 icon=""
namespace stepperHome {
    export enum stepperSpeeds  {
        Slow,
        Mid,
        Fast
    }
    // varibles    
    let stepperDirectionPin: DigitalPin = 0
    let stepperHomePin: DigitalPin = 0
    let stepperPulsePin: DigitalPin = 0
    let stepperLocation: number = 0
    let stepperMaxLocation: number = 800
    let stepperHome: number = 0
    let stepperSpeed: number = 100
  


    /**
     * Speed control
     * @param speed 
    */
    //% block="Set Stepper Speed:  Speed %stepSpeed"
    export function setSpeed(stepSpeed:  stepperSpeeds ): 
    void {
        if (stepSpeed = stepperSpeeds.Slow) {
            stepperSpeed = 500
        }
        if (stepSpeed = stepperSpeeds.Mid) {
            stepperSpeed = 200
        }
        if (stepSpeed = stepperSpeeds.Fast) {
            stepperSpeed = 100
        }
    }



    /**
     * describe your function here
     * @param Pin for Direction
    */
    //% block="Initialize Stepper:  Home %homePin Dir+ %directioPin Pul+ %pulsePin Steps %maxSteps"
    export function initParams(homePin: DigitalPin, directionPin: DigitalPin, pulsePin: DigitalPin, maxSteps: number=800 ): void {
        stepperDirectionPin = directionPin
        stepperHomePin = homePin
        stepperPulsePin = pulsePin
        pins.setPull(stepperHomePin, PinPullMode.PullUp)
        pins.digitalWritePin(stepperDirectionPin, 0)
        stepperMaxLocation = maxSteps
    }

    /**
     * describe your function here
     */
    //% block="Stepper is at Home"
    export function getHome(): number {
        if (pins.digitalReadPin(stepperHomePin) == 0) {
            stepperHome = 1
        }
        else {
            stepperHome = 0
        }
        return stepperHome

    }

    /**
     * get current location
     */
    //% block="Get Current Location"
    export function geLocation(): number {
        return stepperLocation
    }


    /**
     * describe your function here
     */
    //% block="Move to Home position"
    export function goHome() {
        let index = 0
        pins.digitalWritePin(stepperDirectionPin, 1)  // set direction
        while (stepperHome == 0) {
            if (pins.digitalReadPin(stepperHomePin) == 0) {
                stepperHome = 1
            } else {
                stepperHome = 0
            }
            for (index = 0; index < 100; index++) {
                pins.digitalWritePin(stepperPulsePin, 0)
                control.waitMicros(stepperSpeed*2)
                pins.digitalWritePin(stepperPulsePin, 1)
                control.waitMicros(stepperSpeed*2)
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
                    control.waitMicros(stepperSpeed)
                    pins.digitalWritePin(stepperPulsePin, 1)
                    control.waitMicros(stepperSpeed)
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
        pins.digitalWritePin(stepperDirectionPin, 1)
        stepperLocation = stepperLocation - steps           // location when done
        for (let index = 0; index < steps; index++) {       // loop for steps
            if (pins.digitalReadPin(stepperHomePin) == 0) { // check if home
                stepperHome = 1
                stepperLocation = 0
            } else {
                stepperHome = 0                             // no at home
                for (let index = 0; index < 100; index++) {
                    pins.digitalWritePin(stepperPulsePin, 0)
                    control.waitMicros(stepperSpeed)
                    pins.digitalWritePin(stepperPulsePin, 1)
                    control.waitMicros(stepperSpeed)
                }
            }
        }
    }
}
