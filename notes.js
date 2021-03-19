// ----------------------- DEBOUNCE for function ---------------------------------

export function debounce(fn, wait) {
    let timeout
    return function (...args) {
        const later = () => {
            clearTimeout(timeout)
            fn.apply(this, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

// -------------------- Присвоить данные из запроса ---------------------------------

function answer() {
    let telemetry = JSON.parse(xhr.responseText)
    for (let key in telemetry) {
        let data = []
        for (let i = 0; i < telemetry[key].length; i++) {
            telemetry[key][i].value = parseInt(telemetry[key][i].value)
            data.push([telemetry[key][i].ts, telemetry[key][i].value])
        }
        if (typeof self.ctx.flot.ctx.data == 'undefined')
            return

        for (let i = 0; i < self.ctx.flot.ctx.data.length; i++) {
            if (self.ctx.flot.ctx.data[i].dataKey.name !== key)//&& key !== 'state_1')
                continue

            self.ctx.flot.ctx.data[i].data = data
        }
    }
    self.ctx.flot.update();
}

// ----------------------- Work with assetService ---------------------------------

let $injector = self.ctx.$scope.$injector;
let assetService = $injector.get(self.ctx.servicesMap.get('assetService'));
let asset = {
    id: /id/,
    entityType: /typeASSET
}
assetService.findByName(line).subscribe((response) => {})
assetService.saveAsset(asset).subscribe(() => {})

self.ctx.updateAliases();

// -------------------- Observable with native JS for TB ------------------------------

Emitter = function () {};

(function () {
    this.Emitter = {
        listeners: {},
        emit: (event, ...arg) => {
            if (!Array.isArray(this.Emitter.listeners[event])) {
                return false
            }
            this.Emitter.listeners[event].forEach(listener => {
                listener(...arg)
            })
            return true
        },
        subscribe: (event, fn) => {
            this.Emitter.listeners[event] = this.Emitter.listeners[event] || []
            this.Emitter.listeners[event].push(fn)
            return () => {
                this.Emitter.listeners[event] = this.Emitter.listeners[event].filter(listener => listener !== fn)
            }
        }
    }
}).call(Emitter);

exports = {}
exports.Emitter = Emitter;

// подписка
try {
    exports.Emitter.Emitter.subscribe('addNewPolygon', (data) => {
        console.log(data)
    })
} catch (e) {
}

// ------------------------- Observable with native JS ---------------------------------

export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // event - название ивента которое имитим
    emit(event, ...arg) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...arg)
        })
        return true
    }

    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
        }
    }
}

// ---------------------- How work with services --------------------------------

// ------------------- Для перехода между состояниями дашборда ----------------------

self.ctx.stateController.openState( /* тут наименование состояния */, {}, false)

// --------------------------- Для отслеживания изменения переменной ---------------------------
// каждую секунду записываем время из ТВ в currentTimeInTB
setInterval(() => {
    if (typeof self.ctx != 'undefined' && typeof self.ctx.dashboardTimewindow.history != 'undefined' && typeof self.ctx != 'undefined') {
        currentTimeInTB = self.ctx.dashboardTimewindow.history.fixedTimewindow.startTimeMs + self.ctx.dashboardTimewindow.history.fixedTimewindow.endTimeMs
    }
}, 1000)
// каждую секуду проверяем изменилась ли переменная
setInterval(() => {
    if (currentTimeInTB !== oldTime) {
        if (typeof self.ctx != 'undefined' && typeof self.ctx.dashboardTimewindow.history != 'undefined' && typeof self.ctx != 'undefined') {
            // do code
        }
        oldTime = currentTimeInTB;
    }
}, 1000)

// --------------------------- Приличный скролл, CSS ---------------------------

./Ваш класс /:: - webkit - scrollbar - track {
    border - radius: 10px;
    background - color: #fff;
}
./ Ваш класс /:: - webkit - scrollbar {
    width: 8px;
    background - color: #F5F5F5;
}
./ Ваш класс /:: - webkit - scrollbar - thumb {
    border - radius: 10px;
    background - color: #dadada;
}
