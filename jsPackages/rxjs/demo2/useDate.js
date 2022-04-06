
        let {log} = console;








    let opTimeWhile = (date) => {
    let [y, M, d, h, m] = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()];
    return new Date(y, M, d, h, m);
}


    let initOrderTime = (startStr, endStr) => {
        // console.log('startStr, endStr', startStr, endStr);

        let days = [];
        let [sh, sm, eh, em] = [...startStr.split(':'), ...endStr.split(':')]// .map(item => Number(item));
        log([sh, sm, eh, em])
        let startDate = new Date().setHours(sh);
        startDate = new Date(startDate).setMinutes(sm);
        startDate = new Date(startDate);
        startDate = opTimeWhile(startDate);
        let endDate = new Date().setHours(eh);
        // endDate = new Date(endDate).setMinutes(em);
        // log(endDate)
        endDate = new Date(endDate + em * 60 * 1000)
        endDate = new Date(endDate);
        endDate = opTimeWhile(endDate);
        log(endDate)
        let now = new Date();
        console.log(startDate, endDate, now);
        let [nowMs, startMs, endMs] = [now.getTime(), startDate.getTime(), endDate.getTime()];
        let nowMs3 = nowMs + 3 * 3600000;
        // console.log(startMs, endMs, nowMs3);
        if (nowMs3 < startMs) {
            while (days.length < 7) {
                days.push(opOrderTimeDay(startMs + days.length * 86400000, endMs + days.length * 86400000));
            }
        } else if (nowMs3 >= startMs && nowMs3 < endMs) {
            let startMsOfFristDay = [];
            let temp = startMs;
            while (temp < endMs) {
                startMsOfFristDay.push(temp);
                // console.log('temp', temp, new Date(temp));
                temp += 7200000;
            }
            let b = startMsOfFristDay.filter(t => t > nowMs3);
            // console.log(b, startMsOfFristDay);
            if (b.length) {
                days.push(opOrderTimeDay(b[0], endMs));
            }
            while (days.length < 7) {
                days.push(opOrderTimeDay(startMs + days.length * 86400000, endMs + days.length * 86400000));
            }
        } else {
            while (days.length < 7) {
                days.push(opOrderTimeDay(startMs + (days.length + 1) * 86400000, endMs + (days.length + 1) * 86400000));
            }
        }
        days = days.map((item) => {
            let date = new Date(item[0].value);
            let M = date.getMonth();
            let d = date.getDate();
            console.log(item);
            return {
                label: `${M + 1}.${d}`,
                value: date.getTime(),
                children: item,
            };
        });
        console.log('days', days);
        // this.setState({
        //     orderTime: days,
        // });
    }

    let opMinute = (m) => {
        return m > 9 ? m : `0${m}`;
    }

    let opOrderTimeDay = (start, end) => {
        // // ms
        // start // number
        // end   // number
        let day = [];
        let temp = start;
        let d, h, m;
        while (temp + 7200000 < end) {
            d = new Date(temp);
            h = d.getHours();
            m = d.getMinutes();
            day.push({
                label: `${h}:${opMinute(m)}-${h + 2}:${opMinute(m)}`,
                value: temp,
            });
            temp += 7200000;
        }
        d = new Date(temp);
        h = d.getHours();
        m = d.getMinutes();
        let ed = new Date(end);
        let eh = ed.getHours();
        let em = ed.getMinutes();
        day.push({
            label: `${h}:${opMinute(m)}-${eh}:${opMinute(em)}`,
            value: temp,
        });
        // console.log('opOrderTimeDay', day);
        return day;
    }



    // initOrderTime('08:00', '24:00')
    initOrderTime('00:30', '24:00')


