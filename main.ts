radio.onReceivedNumber(function (receivedNumber) {
    if (GameReady == 1 && receivedNumber == 1) {
        teamNumber = 1
        GameReady = 0
    } else if (GameReady == 1 && receivedNumber == 2) {
        teamNumber = 2
        GameReady = 0
    } else if (GameReady == 1 && receivedNumber == 3) {
        teamNumber = 3
        GameReady = 0
    } else if (GameReady == 1 && receivedNumber == 4) {
        teamNumber = 4
        GameReady = 0
    } else {
    	
    }
})
let teamNumber = 0
let GameReady = 0
radio.setGroup(1)
let countdownSeconds = 20
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
GameReady = 1
led.enable(true)
music.setVolume(255)
let tm = TM1637.create(
DigitalPin.P13,
DigitalPin.P14,
7,
4
)
basic.forever(function () {
    if (GameReady == 0) {
        for (let index = 0; index < countdownSeconds / 2; index++) {
            if (GameReady == 0) {
                music.playTone(392, music.beat(BeatFraction.Whole))
                basic.pause(500)
            }
        }
        for (let index = 0; index < countdownSeconds; index++) {
            if (GameReady == 0) {
                music.playTone(392, music.beat(BeatFraction.Half))
                basic.pause(250)
            }
        }
        for (let index = 0; index < 2; index++) {
            if (GameReady == 0) {
                music.playTone(330, music.beat(BeatFraction.Quarter))
                basic.pause(125)
            }
        }
        GameReady = 1
    } else {
    	
    }
})
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P11) == 0) {
        GameReady = 1
    }
    if (GameReady == 1) {
        tm.clear()
        basic.showIcon(IconNames.Happy)
        radio.sendValue("teamResult", 0)
        music.stopAllSounds()
    } else {
        tm.showbit(teamNumber, 3)
        basic.showNumber(teamNumber)
        radio.sendValue("teamResult", teamNumber)
    }
})
