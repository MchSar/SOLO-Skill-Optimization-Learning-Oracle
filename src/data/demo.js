export const careerTracks = [
 { id:'ml-engineer', title:'ML Engineer', description:'Build, train and evaluate machine learning systems.', skills:['Python','Statistics','Machine Learning','Data Handling'] },
 { id:'data-analyst', title:'Data Analyst', description:'Turn raw data into useful insights and decisions.', skills:['SQL','Data Cleaning','Statistics','Visualization'] },
 { id:'software-developer', title:'Software Developer', description:'Design, build and test reliable software applications.', skills:['Programming','Data Structures','Debugging','Software Design'] },
]

const make = (topic, items) => items.map((q, i) => ({ id: `${topic}-${i+1}`, topic, prompt: q[0], options: q[1], answer: q[2] }))

export const questionsByCareer = {
 'ml-engineer': [
  ...make('Python', [
   ['Which Python data structure stores key–value pairs?', ['List','Tuple','Dictionary','Set'],2],
   ['Which keyword defines a function in Python?', ['func','define','def','function'],2],
   ['What does len([4, 8, 12]) return?', ['2','3','4','24'],1],
   ['Which structure is immutable?', ['List','Dictionary','Set','Tuple'],3],
   ['What is the result of 3 // 2?', ['1','1.5','2','0'],0],
  ]),
  ...make('Data handling', [
   ['Why should missing values be handled before training a model?', ['To make files larger','To avoid incomplete or misleading analysis','To rename columns','To increase row count'],1],
   ['What is a duplicate record?', ['A row repeated more than once','A blank column','A high value','A sorted row'],0],
   ['Which measure is often used to fill missing numeric values when outliers exist?', ['Mean','Median','Maximum','Mode only'],1],
   ['Why standardize category labels such as “HR” and “hr”?', ['To reduce inconsistent categories','To increase row count','To remove all text','To change numeric values'],0],
   ['What should you do with an impossible value such as age = -8?', ['Treat it as valid','Flag and investigate it','Copy it to every row','Convert it to a name'],1],
  ]),
  ...make('Machine learning', [
   ['Which task is an example of classification?', ['Predicting house price','Grouping customers without labels','Predicting whether an email is spam','Compressing an image'],2],
   ['Which task predicts a continuous numeric value?', ['Classification','Regression','Clustering','Sorting'],1],
   ['What is a feature in a dataset?', ['An input variable used by a model','The final report title','A model error only','A database password'],0],
   ['Which method groups similar data points without labelled outcomes?', ['Regression','Classification','Clustering','Ranking'],2],
   ['Why split data into training and test sets?', ['To evaluate generalization','To duplicate examples','To remove labels','To guarantee 100% accuracy'],0],
  ]),
  ...make('Model evaluation', [
   ['What does a test dataset help estimate?', ['Performance on unseen data','Training speed only','Number of input columns','Source file size'],0],
   ['What is accuracy?', ['Correct predictions divided by all predictions','False positives only','Training time','Number of features'],0],
   ['When is recall especially important?', ['When missing positive cases is costly','When file size matters','When sorting rows','When plotting dates'],0],
   ['What does a confusion matrix summarize?', ['Prediction counts by actual and predicted class','Missing file paths','Feature names only','Training hardware'],0],
   ['Why use cross-validation?', ['To assess performance across multiple data splits','To make labels disappear','To increase duplicate rows','To avoid testing'],0],
  ]),
  ...make('Model behaviour', [
   ['A model performs well on training data but poorly on test data. What is likely happening?', ['Underfitting','Overfitting','Perfect generalization','Normalization'],1],
   ['What is data leakage?', ['Using information unavailable at prediction time','Removing duplicate rows','Saving a model','Splitting a chart'],0],
   ['What is concept drift?', ['The relationship between inputs and target changes over time','A model file is renamed','A dataset is sorted','A chart changes colour'],0],
   ['Why check model fairness across groups?', ['To detect unequal or harmful performance differences','To increase the number of columns','To shorten code','To remove the test set'],0],
   ['What is a useful response when model predictions become unreliable after deployment?', ['Monitor performance and investigate drift','Ignore user feedback','Delete all logs','Assume accuracy is fixed'],0],
  ]),
 ],
 'data-analyst': [
  ...make('SQL', [
   ['Which SQL clause filters rows before grouping?', ['ORDER BY','WHERE','HAVING','JOIN'],1],
   ['Which SQL command retrieves data?', ['SELECT','UPDATE','DROP','ALTER'],0],
   ['Which clause sorts query results?', ['GROUP BY','ORDER BY','WHERE','INSERT'],1],
   ['Which function counts rows?', ['SUM()','COUNT()','AVG()','ROUND()'],1],
   ['Which join returns matching rows from both tables?', ['INNER JOIN','CROSS JOIN','FULL OUTER JOIN','SELF JOIN only'],0],
  ]),
  ...make('Data cleaning', [
   ['What is a sensible first step when a dataset contains missing values?', ['Delete every column','Inspect how many values are missing and why','Duplicate all rows','Ignore the issue'],1],
   ['What is the purpose of removing duplicate records?', ['Prevent double-counting','Increase sample size','Change data types','Create missing values'],0],
   ['Which measure is often robust for filling skewed numeric data?', ['Median','Maximum','Sum','Range'],0],
   ['What should be done with inconsistent date formats?', ['Standardize them','Delete every date','Treat each as a category','Ignore them'],0],
   ['What should an analyst do with an impossible value?', ['Validate and flag it','Assume it is correct','Copy it','Hide it from the report'],0],
  ]),
  ...make('Statistics', [
   ['Which measure is usually less affected by extreme outliers?', ['Mean','Median','Range','Sum'],1],
   ['What does the mean represent?', ['Arithmetic average','Most frequent value','Middle value only','Largest value'],0],
   ['What does standard deviation describe?', ['Spread of values around the mean','Number of rows','The median category','A chart title'],0],
   ['What does correlation measure?', ['Association between variables','Proof of causation','Missing data count','Dataset size'],0],
   ['What is an outlier?', ['An unusually distant observation','The average value','A column heading','A duplicated chart'],0],
  ]),
  ...make('Visualization', [
   ['Which chart is generally useful for comparing values across categories?', ['Bar chart','Scatter plot only','Network graph','Map projection'],0],
   ['Which chart is useful for showing a distribution?', ['Histogram','Pie chart only','Org chart','Gantt chart'],0],
   ['Which chart helps inspect the relationship between two numeric variables?', ['Scatter plot','Stacked text','Flowchart','Treemap only'],0],
   ['What makes a chart misleading?', ['A truncated axis that exaggerates differences','Clear labels','A descriptive title','A stated data source'],0],
   ['What should every chart communicate clearly?', ['What is being measured','The analyst’s password','All raw records','Unrelated decoration'],0],
  ]),
  ...make('Analysis', [
   ['What should an analyst do before presenting a surprising trend?', ['Assume it is correct','Check data quality and context','Remove inconvenient values','Change the chart title'],1],
   ['What is a KPI?', ['A key performance indicator','A database language','A chart colour','A missing value'],0],
   ['Why segment customers in an analysis?', ['Compare meaningful groups','Hide poor results','Increase file size','Remove the target metric'],0],
   ['What should accompany a business recommendation?', ['Evidence and limitations','Only a bold headline','Unverified assumptions','A random chart'],0],
   ['What is a useful first step when a metric suddenly changes?', ['Investigate definitions, data and context','Immediately claim success','Delete earlier data','Ignore the change'],0],
  ]),
 ],
 'software-developer': [
  ...make('Programming', [
   ['What is the purpose of a function?', ['Store only images','Group reusable instructions','Increase screen brightness','Delete variables'],1],
   ['What is a variable used for?', ['Store a value','Compile the monitor','Connect to Wi-Fi only','Format a hard drive'],0],
   ['Which construct repeats a block of code?', ['Loop','Comment','Import','Class name only'],0],
   ['What does a conditional statement do?', ['Chooses a path based on a condition','Always repeats forever','Deletes a function','Stores a file'],0],
   ['What is an argument passed to a function?', ['An input value','A compiler warning','A file extension','A loop counter only'],0],
  ]),
  ...make('Data structures', [
   ['Which data structure follows first-in, first-out order?', ['Stack','Queue','Tree','Set'],1],
   ['Which structure follows last-in, first-out order?', ['Queue','Stack','Graph','Array only'],1],
   ['Which structure stores key–value pairs?', ['Dictionary / Map','Queue','Stack','Linked list only'],0],
   ['Which structure is useful for representing hierarchical data?', ['Tree','Queue','Stack','Hash only'],0],
   ['What is the average lookup time of a hash table?', ['O(1)','O(n²)','O(log n) always','O(n!)'],0],
  ]),
  ...make('Debugging', [
   ['A program crashes on a particular input. What is a useful first action?', ['Change random lines','Reproduce the issue and inspect the error','Delete the test','Ignore the input'],1],
   ['What is a breakpoint used for?', ['Pause execution to inspect program state','Delete a variable','Deploy an application','Rename a branch'],0],
   ['Why read a stack trace?', ['Find where an error occurred','Improve screen resolution','Compress source files','Create a database'],0],
   ['What is a regression bug?', ['A previously working feature breaks after a change','A new feature request','A code comment','A successful test'],0],
   ['What is a good debugging practice?', ['Change one thing and retest','Change many unrelated things','Skip reproduction','Ignore logs'],0],
  ]),
  ...make('Version control', [
   ['What is Git primarily used for?', ['Image editing','Tracking changes in source code','Hosting databases only','Compiling every language'],1],
   ['What does a Git commit represent?', ['A recorded snapshot of changes','A deleted repository','A running server','A package install'],0],
   ['Why create a branch?', ['Work on changes separately','Erase project history','Replace testing','Avoid saving files'],0],
   ['What does git pull generally do?', ['Fetches and integrates remote changes','Deletes all branches','Creates a new language','Runs unit tests only'],0],
   ['What should be done before merging a feature?', ['Review and test the changes','Delete the tests','Ignore conflicts','Rename every file'],0],
  ]),
  ...make('Software testing', [
   ['What does a unit test usually check?', ['A small isolated piece of behaviour','The entire internet connection','Monitor resolution','All user passwords'],0],
   ['What is an integration test?', ['Checks components working together','Checks only a variable name','Measures screen size','Formats source code'],0],
   ['Why test edge cases?', ['To catch failures at boundary or unusual inputs','To avoid normal tests','To increase code length','To remove documentation'],0],
   ['What is a test assertion?', ['A condition the test expects to be true','A deployment server','A database table','A code formatter'],0],
   ['When should automated tests be run?', ['Regularly, especially after changes','Only after a major outage','Never on branches','Only before writing code'],0],
  ]),
 ]
}
