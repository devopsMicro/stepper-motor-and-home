/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/



/**
 * Stepper blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace stepperHome {

       
    
    let stepperDirectionPin = 0
    let stepperHomePin = 0
    let stepperPulsePin = 0
    let location = 0
    let maxLocation = 0
    let home = 0
    
    home = 0
    maxLocation = 800


    /**
     * describe your function here
     * @param Pin for Direction
    */
        //% block="Set Pins For Stepper with Home %homePin Dir %directioPin Puls %pulsePin"
    export function initParams(homePin: DigitalPin, directionPin: DigitalPin, pulsePin: DigitalPin): void {
        stepperDirectionPin= directionPin
        stepperHomePin = homePin
        stepperPulsePin = pulsePin
        pins.setPull(stepperHomePin, PinPullMode.PullUp)
        pins.digitalWritePin(stepperDirectionPin, 0)
    }


        /**
         * describe your function here
         */
        //% block="Move to Home position"
        export function goHome() {
            pins.digitalWritePin(stepperDirectionPin, 1)  // set direction
            

            while (home == 0) {
                if (pins.digitalReadPin(stepperHomePin) == 0) {
                    home = 1
                } else {
                    home = 0
                }
                for (let index = 0; index < 100; index++) {
                    pins.digitalWritePin(stepperPulsePin, 0)
                    control.waitMicros(500)
                    pins.digitalWritePin(stepperPulsePin, 1)
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
        export function goForward(Steps: number) {
            pins.digitalWritePin(stepperDirectionPin, 0)  // set direction
            for (let index = 0; index < Steps; index++) {
                location += 1
                if (maxLocation >= location) {
                    for (let index = 0; index < 100; index++) {
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
            location = location - steps
            for (let index = 0; index < steps; index++) {
                if (pins.digitalReadPin(stepperHomePin) == 0) {
                    home = 1
                    location = 0
                } else {
                    home = 0
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
