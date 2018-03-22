
if (!testLevels) {
    var testLevels = {};

    testLevels.groups = ['Total', 'Skipped', 'Run', 'Passed', 'Failed', 'Errors', 'Events'];

    testLevels.dataPoints = [];

    testLevels.visOptions = {
        clickToUse: true,
        legend: true,
        height: '100%',
        start: "2018-03-12 07:00:00",
        min: "2018-03-12 07:00:00",
        end: "2018-03-19 22:00:00",
        max: "2018-03-19 22:00:00",
        hiddenDates: [
            {start: '2018-03-17 00:00:00', end: '2018-03-19 00:00:00', repeat: 'weekly'}
        ],
        defaultGroup: 'ungrouped',
        groups: {
            visibility: {
                0: true,
                1: false,
                2: true,
                3: true,
                4: true,
                5: true,
                6: true,
                "__ungrouped__": false // default group hidden
            }
        },
        dataAxis: {
            left: {
                range: {min: 0, max: 6000}
            },
            right: {
                range: {min: 0, max: 6000}
            }
        }
    };

    testLevels.getDataItems = function () {
        var dataPoints = [];

        for (var i = 0; i < testsData.testsRunData.length; i++) {

            var totalLabel = undefined;
            var runLabel = undefined;

            if (i === 0 || i === testsData.testsRunData.length - 1) {
                totalLabel = {content: testsData.testsRunData[i]["total"] + ""};
                runLabel = {content: testsData.testsRunData[i]["run"] + ""};
            }

            var total = {
                x: Date.parse(testsData.testsRunData[i]["runAt"]),
                y: testsData.testsRunData[i]["total"],
                label: totalLabel,
                group: 0
            };
            var skipped = {
                x: Date.parse(testsData.testsRunData[i]["runAt"]),
                y: testsData.testsRunData[i]["skipped"],
                group: 1
            };
            var run = {
                x: Date.parse(testsData.testsRunData[i]["runAt"]),
                y: testsData.testsRunData[i]["run"],
                label: runLabel,
                group: 2
            };
            var passed = {
                x: Date.parse(testsData.testsRunData[i]["runAt"]),
                y: testsData.testsRunData[i]["passed"],
                label: ((i % 3 !== 0) && (i !== testsData.testsRunData.length - 1) && (i !== 0)) ? undefined : {
                    content: testsData.testsRunData[i]["passed"] + "",
                    xOffset: -20,
                    yOffset: (i % 2 === 0) ? -5 : 20
                },
                group: 3
            };
            var failed = {
                x: Date.parse(testsData.testsRunData[i]["runAt"]),
                y: testsData.testsRunData[i]["failed"],
                label: ((i % 3 !== 0) && (i !== testsData.testsRunData.length - 1) && (i !== 0)) ? undefined : {
                    content: testsData.testsRunData[i]["failed"] + "",
                    yOffset: (i % 2 === 0) ? 10 : -10
                },
                group: 4
            };
            var errors = {
                x: Date.parse(testsData.testsRunData[i]["runAt"]),
                y: testsData.testsRunData[i]["errors"],
                label: ((i % 3 !== 0) && (i !== testsData.testsRunData.length - 1) && (i !== 0)) ? undefined : {
                    content: testsData.testsRunData[i]["errors"] + "",
                    yOffset: (i % 2 === 0) ? 10 : -10
                },
                group: 5
            };

            var testsDataTotal = testsData.testsRunData[i]["total"];
            var expectedTotal = (testsData.testsRunData[i]["skipped"] + testsData.testsRunData[i]["run"]);
            if (testsDataTotal !== expectedTotal) {
                console.error("Problem parsing data: run + skipped not equal to total: " 
                        + testsDataTotal + " != " 
                        + expectedTotal);
            }

            var testsDataRun = testsData.testsRunData[i]["run"]
            var expectedRun = testsData.testsRunData[i]["passed"] + testsData.testsRunData[i]["errors"] + testsData.testsRunData[i]["failed"];
            if (testsDataRun !== expectedRun) {
                console.error("Problem parsing data: passed + failed + errors not equal to total run: "
                        + testsDataRun + " != " 
                        + expectedRun);
            }

            dataPoints.push(total);
            dataPoints.push(skipped);
            dataPoints.push(run);
            dataPoints.push(passed);
            dataPoints.push(errors);
            dataPoints.push(failed);
        }
			
        for(var i = 0; i < testsData.testsGroupData.length; i++) {
            dataPoints.push(testsData.testsGroupData[i]);
        }
        
        return dataPoints;
    };

    testLevels.getVisGroups = function () {
        var groups = new vis.DataSet();

        groups.add({
            id: 0,
            content: testLevels.groups[0],
            className: 'group-total',
            options: {
                yAxisOrientation: 'right',
                drawPoints: false,
                interpolation: false,
                shaded: {
                    orientation: 'bottom' // top, bottom
                }
            }});

        groups.add({
            id: 1,
            content: testLevels.groups[1],
            className: 'group-skipped',
            options: {
                yAxisOrientation: 'right',
                drawPoints: false,
                interpolation: false,
                shaded: {
                    orientation: 'bottom' // top, bottom
                }
            }});

        groups.add({
            id: 2,
            content: testLevels.groups[2],
            className: 'group-run',
            options: {
                yAxisOrientation: 'right',
                drawPoints: false,
                interpolation: false,
                shaded: {
                    orientation: 'bottom' // top, bottom
                }
            }});

        groups.add({
            id: 3,
            content: testLevels.groups[3],
            className: 'group-passed',
            options: {
                drawPoints: {
                    style: 'circle' // square, circle
                },
                interpolation: false,
                shaded: {
                    orientation: 'bottom' // top, bottom
                }
            }});

        groups.add({
            id: 4,
            content: testLevels.groups[4],
            className: 'group-failed',
            options: {
                drawPoints: {
                    style: 'circle' // square, circle
                },
                interpolation: false,
                shaded: {
                    orientation: 'bottom' // top, bottom
                }
            }});

        groups.add({
            id: 5,
            content: testLevels.groups[5],
            className: 'group-error',
            options: {
                drawPoints: {
                    style: 'circle' // square, circle
                },
                interpolation: false,
                shaded: {
                    orientation: 'bottom' // top, bottom
                }
            }});

        /** Event groups red */
        for (var i = 6; i < 20; i++) {
            groups.add({
                id: i,
                content: testLevels.groups[6],
                className: 'group-events-red',
                options: {
                    drawPoints: {
                        style: 'points' // square, circle
                    },
                    interpolation: false,
                    shaded: {
                        orientation: 'bottom' // top, bottom
                    },
                    excludeFromLegend: true
                }});
        }

        /** Event groups green */
        for (var i = 20; i < 30; i++) {
            groups.add({
                id: i,
                content: testLevels.groups[6],
                className: 'group-events-green',
                options: {
                    drawPoints: {
                        style: 'points' // square, circle
                    },
                    interpolation: false,
                    shaded: {
                        orientation: 'bottom' // top, bottom
                    },
                    excludeFromLegend: true
                }});
        }

        return groups;
    };
}

if (!testsData) {

    var testsData = {};

    testsData.testsRunData = [
        {
            runAt: "2018-03-12 09:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1912,
            errors: 0,
            failed: 0
        },
        {
            runAt: "2018-03-12 10:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 456,
            errors: 1016,
            failed: 440
        },
        {
            runAt: "2018-03-12 11:45:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 614,
            errors: 815,
            failed: 483
        },
        {
            runAt: "2018-03-12 12:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 628,
            errors: 882,
            failed: 402
        },
        {
            runAt: "2018-03-12 13:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 677,
            errors: 850,
            failed: 385
        },
        {
            runAt: "2018-03-12 14:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 782,
            errors: 761,
            failed: 369
        },
        {
            runAt: "2018-03-12 15:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 952,
            errors: 699,
            failed: 261
        },
        {
            runAt: "2018-03-12 16:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 938,
            errors: 727,
            failed: 247
        },
        {
            runAt: "2018-03-12 16:45:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 960,
            errors: 713,
            failed: 239
        },
        {
            runAt: "2018-03-12 17:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1027,
            errors: 680,
            failed: 205
        },
        {
            runAt: "2018-03-12 18:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 870,
            errors: 687,
            failed: 355
        },
        {
            runAt: "2018-03-13 08:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 870,
            errors: 687,
            failed: 355
        },
        {
            runAt: "2018-03-13 10:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1035,
            errors: 680,
            failed: 197
        },
        {
            runAt: "2018-03-13 11:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1044,
            errors: 683,
            failed: 185
        },
        {
            runAt: "2018-03-13 12:45:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1082,
            errors: 587,
            failed: 243
        },
        {
            runAt: "2018-03-13 14:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1154,
            errors: 527,
            failed: 231
        },
        {
            runAt: "2018-03-13 14:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1154,
            errors: 532,
            failed: 226
        },
        {
            runAt: "2018-03-13 15:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1189,
            errors: 509,
            failed: 214
        },
        {
            runAt: "2018-03-13 15:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1193,
            errors: 506,
            failed: 213
        },
        {
            runAt: "2018-03-13 15:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1223,
            errors: 470,
            failed: 219
        },
        {
            runAt: "2018-03-13 16:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1231,
            errors: 480,
            failed: 201
        },
        {
            runAt: "2018-03-13 16:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1242,
            errors: 502,
            failed: 168
        },
        {
            runAt: "2018-03-13 17:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1248,
            errors: 512,
            failed: 152
        },
        {
            runAt: "2018-03-13 17:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1246,
            errors: 508,
            failed: 158
        },
        {
            runAt: "2018-03-13 17:45:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1272,
            errors: 489,
            failed: 151
        },
        {
            runAt: "2018-03-13 18:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1309,
            errors: 432,
            failed: 171
        },
        {
            runAt: "2018-03-13 18:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1349,
            errors: 388,
            failed: 175
        },
        {
            runAt: "2018-03-13 18:45:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1345,
            errors: 390,
            failed: 177
        },
        {
            runAt: "2018-03-14 09:45:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1347,
            errors: 395,
            failed: 170
        },
        {
            runAt: "2018-03-14 10:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1379,
            errors: 360,
            failed: 173
        },
        {
            runAt: "2018-03-14 11:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1408,
            errors: 334,
            failed: 170
        },
        {
            runAt: "2018-03-14 11:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1415,
            errors: 329,
            failed: 168
        },
        {
            runAt: "2018-03-14 11:45:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1433,
            errors: 313,
            failed: 166
        },
        {
            runAt: "2018-03-14 12:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1086,
            errors: 568,
            failed: 258
        },
        {
            runAt: "2018-03-14 14:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1614,
            errors: 9,
            failed: 289
        },
        {
            runAt: "2018-03-14 14:45:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1614,
            errors: 9,
            failed: 289
        },
        {
            runAt: "2018-03-14 15:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1617,
            errors: 6,
            failed: 289
        },
        {
            runAt: "2018-03-14 16:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1617,
            errors: 4,
            failed: 291
        },
        {
            runAt: "2018-03-14 16:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1617,
            errors: 0,
            failed: 295
        },
        {
            runAt: "2018-03-14 17:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1617,
            errors: 0,
            failed: 295
        },
        {
            runAt: "2018-03-14 18:45:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1638,
            errors: 2,
            failed: 272
        },
        {
            runAt: "2018-03-14 19:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1632,
            errors: 0,
            failed: 280
        },
        {
            runAt: "2018-03-15 09:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1632,
            errors: 0,
            failed: 280
        },
        {
            runAt: "2018-03-15 10:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1652,
            errors: 0,
            failed: 260
        },
        {
            runAt: "2018-03-15 10:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1687,
            errors: 0,
            failed: 225
        },
        {
            runAt: "2018-03-15 11:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1730,
            errors: 0,
            failed: 182
        },
        {
            runAt: "2018-03-15 11:45:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1757,
            errors: 0,
            failed: 155
        },
        {
            runAt: "2018-03-15 12:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1759,
            errors: 0,
            failed: 153
        },
        {
            runAt: "2018-03-15 12:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1769,
            errors: 0,
            failed: 143
        },
        {
            runAt: "2018-03-15 12:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1771,
            errors: 0,
            failed: 141
        },
        {
            runAt: "2018-03-15 12:45:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1776,
            errors: 0,
            failed: 136
        },
        {
            runAt: "2018-03-15 14:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1785,
            errors: 0,
            failed: 127
        },
        {
            runAt: "2018-03-15 15:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1796,
            errors: 0,
            failed: 116
        },
        {
            runAt: "2018-03-15 16:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1839,
            errors: 0,
            failed: 73
        },
        {
            runAt: "2018-03-15 16:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1845,
            errors: 0,
            failed: 67
        },
        {
            runAt: "2018-03-15 16:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1876,
            errors: 1,
            failed: 35
        },
        {
            runAt: "2018-03-15 16:45:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1881,
            errors: 0,
            failed: 31
        },
        {
            runAt: "2018-03-15 17:00:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1894,
            errors: 0,
            failed: 18
        },
        {
            runAt: "2018-03-15 17:15:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1912,
            errors: 0,
            failed: 0
        },
        {
            runAt: "2018-03-15 17:30:00",
            total: 1971,
            run: 1912,
            skipped: 59,
            passed: 1912,
            errors: 0,
            failed: 0
        },
        {
            runAt: "2018-03-15 18:00:00",
            total: 1971,
            run: 1971,
            skipped: 0,
            passed: 1947,
            errors: 0,
            failed: 24
        },
        {
            runAt: "2018-03-16 11:00:00",
            total: 1971,
            run: 1971,
            skipped: 0,
            passed: 1947,
            errors: 0,
            failed: 24
        },
        {
            runAt: "2018-03-16 11:30:00",
            total: 1971,
            run: 1971,
            skipped: 0,
            passed: 1971,
            errors: 0,
            failed: 0
        },
        {
            runAt: "2018-03-16 12:30:00",
            total: 2263,
            run: 2263,
            skipped: 0,
            passed: 2263,
            errors: 0,
            failed: 0
        },
        {
            runAt: "2018-03-16 15:30:00",
            total: 2263,
            run: 2263,
            skipped: 0,
            passed: 2263,
            errors: 0,
            failed: 0
        },
        {
            runAt: "2018-03-16 17:30:00",
            total: 2599,
            run: 2599,
            skipped: 0,
            passed: 2375,
            errors: 224,
            failed: 0
        },
        {
            runAt: "2018-03-16 18:15:00",
            total: 2599,
            run: 2599,
            skipped: 0,
            passed: 2471,
            errors: 128,
            failed: 0
        },
        {
            runAt: "2018-03-16 19:00:00",
            total: 2599,
            run: 2599,
            skipped: 0,
            passed: 2375,
            errors: 224,
            failed: 0
        },
        {
            runAt: "2018-03-19 09:00:00",
            total: 2599,
            run: 2599,
            skipped: 0,
            passed: 2375,
            errors: 224,
            failed: 0
        },
        {
            runAt: "2018-03-19 12:00:00",
            total: 2599,
            run: 2599,
            skipped: 0,
            passed: 2375,
            errors: 224,
            failed: 0
        },
        {
            runAt: "2018-03-19 16:30:00",
            total: 2599,
            run: 2599,
            skipped: 0,
            passed: 2599,
            errors: 0,
            failed: 0
        },
        {
            runAt: "2018-03-19 19:30:00",
            total: 2599,
            run: 2599,
            skipped: 0,
            passed: 2599,
            errors: 0,
            failed: 0
        }
    ];

    testsData.testsGroupData = [
        {
            x: '2018-03-12 09:00:00',
            y: 5200,
            label: {
                content: 'Pre-refactor',
                yOffset: -4,
            },
            group: 6
        },
        {
            x: '2018-03-12 10:15:00',
            y: 4800,
            label: {
                content: 'Refactor start',
                yOffset: -4,
            },
            group: 7
        },
        {
            x: '2018-03-12 18:00:00',
            y: 4400,
            label: {
                content: 'Problem introduced (faulty code)',
                yOffset: -4,
            },
            group: 8
        },
        {
            x: '2018-03-14 12:30:00',
            y: 5200,
            label: {
                content: 'Problem introduced (NPE)',
                yOffset: -4,
            },
            group: 9
        },
        {
            x: '2018-03-14 17:00:00',
            y: 4800,
            label: {
                content: 'Test errors fixed',
                yOffset: -4,
                xOffset: 5,
            },
            group: 20
        },
        {
            x: '2018-03-15 18:00:00',
            y: 4800,
            label: {
                content: 'Skipped tests reintroduced',
                yOffset: -4,
                xOffset: 5,
            },
            group: 21
        },
        {
            x: '2018-03-16 11:30:00',
            y: 5200,
            label: {
                content: 'Tests fixed',
                yOffset: -4,
            },
            group: 22
        },
        {
            x: '2018-03-16 12:30:00',
            y: 4800,
            label: {
                content: 'New tests',
                yOffset: -4,
            },
            group: 23
        },
        {
            x: '2018-03-16 17:30:00',
            y: 4400,
            label: {
                content: 'New tests (some failing)',
                yOffset: -4,
            },
            group: 10
        },
        {
            x: '2018-03-16 18:15:00',
            y: 4000,
            label: {
                content: 'Some tests corrected',
                yOffset: -4,
            },
            group: 11
        },
        {
            x: '2018-03-16 19:00:00',
            y: 3600,
            label: {
                content: 'Revert, not good enough',
                yOffset: -4,
            },
            group: 12
        },
        {
            x: '2018-03-19 16:30:00',
            y: 3200,
            label: {
                content: 'All new test failures resolved',
                yOffset: -4,
                xOffset: -235,
            },
            group: 24
        },
        {
            x: '2018-03-19 19:30:00',
            y: 2800,
            label: {
                content: 'Done',
                yOffset: -4,
                xOffset: -45,
            },
            group: 25
        }
    ];
}