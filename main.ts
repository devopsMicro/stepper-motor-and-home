function goHome () {
    pins.digitalWritePin(DigitalPin.P9, 1)
    while (home == 0) {
        if (pins.digitalReadPin(DigitalPin.P8) == 0) {
            home = 1
        } else {
            home = 0
        }
        for (let index = 0; index < 100; index++) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            control.waitMicros(500)
            pins.digitalWritePin(DigitalPin.P13, 1)
            control.waitMicros(500)
        }
    }
    location = 0
}
function goForward (Steps: number) {
    pins.digitalWritePin(DigitalPin.P9, 0)
    for (let index = 0; index < Steps; index++) {
        if (MaxLocation >= location) {
            location += 1
            for (let index = 0; index < 100; index++) {
                pins.digitalWritePin(DigitalPin.P13, 0)
                control.waitMicros(200)
                pins.digitalWritePin(DigitalPin.P13, 1)
                control.waitMicros(200)
            }
        }
    }
}
input.onButtonPressed(Button.A, function () {
    control.reset()
})
input.onButtonPressed(Button.AB, function () {
    goHome()
})
input.onButtonPressed(Button.B, function () {
    goBackwards(100)
})
function goBackwards (steps: number) {
    pins.digitalWritePin(DigitalPin.P9, 1)
    location = location - steps
    for (let index = 0; index < steps; index++) {
        if (pins.digitalReadPin(DigitalPin.P8) == 0) {
            home = 1
            location = 0
        } else {
            home = 0
            for (let index = 0; index < 100; index++) {
                pins.digitalWritePin(DigitalPin.P13, 0)
                control.waitMicros(200)
                pins.digitalWritePin(DigitalPin.P13, 1)
                control.waitMicros(200)
            }
        }
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    goForward(100)
})
let location = 0
let home = 0
let MaxLocation = 0
let target1Hit = false
let target2Hit = false
let target1Done = false
let target2Done = false
basic.showString("CLASS OF 2024")
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
if (false) {
    pins.digitalWritePin(DigitalPin.P9, 0)
    MaxLocation = 800
    home = 0
}
basic.showIcon(IconNames.House)
basic.pause(200)
basic.forever(function () {
    if ((0 as any) == (1 as any)) {
        if (pins.digitalReadPin(DigitalPin.P8) == 0) {
            home = 1
        } else {
            home = 0
        }
        basic.showNumber(home)
    }
    basic.pause(10)
})
