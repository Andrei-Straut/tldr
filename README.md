# Test Levels During Refactor
## A story of test runs during a 7-day refactoring session
### What is this?
A history of tests run during the refactoring of a software component with ~10.000 lines of code, across a period of ~7 days
### What kind of tests were run?
Blackbox/Integration tests.  
Input fed to the component, output tested.  
Pure unit tests not included, as the whole code was thrown out and replaced.  
### Why is this important?
It shows a very typical evolution of test results during a very typical refactor: (ups and downs, problems introduced, detected, corrected, code reverts, new tests).  
It shows (again) how having tests helps build confidence when making changes to software  
It shows (again) how integration tests can help preserve functionality, even if the concrete implementation of the tested component changes completely
### How do I read/use this?  
If you click on the [graph here](https://www.andreistraut.info/tldr/ "TLDR Live Version"), you can zoom in, out, or pan to a period of interest. You can also show or hide certain categories.  
To return to page scroll, simply click somewhere out of the graph.  
The graph shows the test results, for each test run, in intervals approximated to 15 mins.  
Some notable events are also marked (refactor start, significant test changes, etc). Positive changes are marked in green, negative in red  
### How was this generated?  
After each test run, I took the results from Jenkins, formatted them as JSON, and with the help of my beloved [vis.js](http://visjs.org/ "Vis.js website"), I created a simple graph to display the info.  
### Can I reuse? How?  
Sure! Clone the repository, and you can get started. You will need to have Java, Maven and a web server (JBoss, Glassfish, Tomcat, etc) installed.  
If you only want to play with the graph itself, the data is in `test-levels.js`. The JavaScript that puts it all together is in `test-levels-main.js`. You will also need [vis.js](http://visjs.org/ "Vis.js website").