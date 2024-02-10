input.onButtonPressed(Button.A, function () {
    stepperHome.goForward(750)
})
input.onButtonPressed(Button.AB, function () {
    stepperHome.goHome()
})
input.onButtonPressed(Button.B, function () {
    stepperHome.goBackwards(750)
})
stepperHome.initParams(DigitalPin.P8, DigitalPin.P9, DigitalPin.P13)
basic.forever(function () {
    basic.pause(100)
    basic.showNumber(stepperHome.getHome())
    serial.writeValue("x", stepperHome.geLocation())
})
