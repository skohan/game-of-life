
// console.log("hello world")

var app = new Vue({

    el: '#app',
    data: {
        n: parseInt(window.innerWidth/70),
        // n: 8,
        arr: [],
        started: false,
        interval_fun: null,
        interval: 1000,
    },
    methods: {
        createNDArray: function () {
            if (this.arr.isEmpty)
                this.arr = new Array(this.n);
            for (var i = 0; i < this.n; i++) {
                this.arr[i] = new Array(this.n);

                for (var j = 0; j < this.n; j++)
                    this.arr[i][j] = false;
            }
        },

        clear: function () {
            
            for (var i = 0; i < this.n; i++) {
                for (var j = 0; j < this.n; j++)
                {
                    if(this.arr[i][j])
                        this.toggle(i,j);
                }
            };
            this.stop();
        },

        stop: function () {
            this.started = false;
            console.log("Stop")
            clearInterval(this.interval_val);
        },

        start: function () {
            if(this.started) return;

            this.started = true;
            console.log("Start");
            clearInterval(this.interval_val);

            this.interval_val = setInterval(() => {

                this.update();

            }, this.interval);
        },

        update: function () {

            kill = [];
            revive = [];
            let n = this.n;
            for (var i = 0; i < this.n; i++) {
                for (var j = 0; j < this.n; j++) {
                    // surrounding alives count
                    sa = 0;

                    ivals = [i, i-1, i+1];
                    jvals = [j, j-1, j+1];

                    for (const ith of ivals) {
                        for (const jth of jvals) {
                            if(ith < 0 || ith > n-1)
                                continue;
                            if (jth < 0 || jth > n - 1)
                                continue;
                            
                            if(this.arr[ith][jth])
                                sa++;
                        }
                    }

                    if(this.arr[i][j])
                        sa--;

                    if (sa == 3)
                        revive.push({
                            i: i,
                            j: j,
                        })

                    if (sa > 3 || sa < 2)
                        kill.push({
                            i: i,
                            j: j,
                        });
                }
            }

            kill.forEach(k => {
                if (this.arr[k.i][k.j])
                    app.toggle(k.i, k.j);
            });

            revive.forEach(r => {
                if (!this.arr[r.i][r.j])
                    app.toggle(r.i, r.j);
            });
        },

        toggle: function (i, j) {
            // console.log(i,j);
            // console.log(this.arr[i][j]);
            if (app.arr[i][j])
                app.arr[i][j] = false;
            else
                app.arr[i][j] = true;
            // console.log(this.arr[i][j])

            Vue.set(
                app.arr,
                i,
                this.arr[i]
            )
        }
    },
    beforeMount() {
        this.createNDArray();
    }
})