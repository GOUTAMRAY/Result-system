
/****
 * 
 * send data to ls
 */
const sendDatals = (key , data) => {
  localStorage.setItem(key, JSON.stringify(data));
};


/****
* 
* Get data from ls
*/
const getDatals = (key) => {
if(localStorage.getItem(key)){
return JSON.parse(localStorage.getItem(key));
};

return [];
};

/***
 * 
 * Roll functiomn
 */

const isRoll = (roll) => {
  const pattern = /^[0-9]{6,}$/;

  return pattern.test(roll);
};

/***
 * 
 * Roll functiomn
 */

const isReg = (reg) => {
  const pattern = /^[0-9]{8,}$/;

  return pattern.test(reg);
};


/****
* 
* create alert 
*/
const createAlert = (msg , type = "danger") => {
return `
 <p class="alert alert-${type} d-flex justify-content-between"> ${msg}
 <button class="btn-close" data-bs-dismiss="alert"></button>
</p>
`
};

/***
* 
* time age function 
* 
*/
const timeAgo = (timestamp) => {
  const currentDate = new Date();
  const targetDate = new Date(timestamp);
  const timeDifference = currentDate - targetDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "a year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "a month ago" : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? "a day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds <= 10 ? "just now" : `${seconds} seconds ago`;
  }
};

/****
 * 
 * create a random id 
 */

// Function to generate a random unique string ID
const getRandomUniqueID = () => {
  const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const idLength = 10; // You can adjust the length of the generated ID as needed
  let randomID = '';

  // Generate a random ID
  for (let i = 0; i < idLength; i++) {
    randomID += alphanumericChars.charAt(Math.floor(Math.random() * alphanumericChars.length));
  }

  // Append a timestamp to ensure uniqueness
  const timestamp = new Date().getTime().toString();

  // Combine the random ID and the timestamp to form the final unique ID
  const uniqueID = `${randomID}-${timestamp}`;

  return uniqueID;
}


/***
 * 
 * GET gpa & grade calcultion 
 */

const getGpaGrade = (marks) => {
  
  let gpa = 0;
  let grade;

  if (marks >= 0 && marks < 33 ) {
      gpa   =  0;
      grade ="F";
  }else if(marks >= 33 && marks < 40){
     gpa   =  1;
     grade ="D";
  }else if(marks >= 40 && marks < 50){
     gpa   =  2;
     grade ="C";
  }else if(marks >= 50 && marks < 60){
     gpa   =  3;
     grade ="B";
  }else if(marks >= 60 && marks < 70){
     gpa =  3.5;
     grade ="A-";
  }else if(marks >= 70 && marks < 80){
     gpa =  4;
     grade ="A";
  }else if(marks >= 80 && marks <= 100){
     gpa =  5;
     grade ="A+";
  }else{
    gpa = "invalid gpa ";
    grade = "invalid grade"
  }

  return{
    gpa : gpa,
    grade : grade,
  };
};


/***
 * 
 * finalresut 
 */

const getFinalResult = (marks) => {
   let cgpa;
   let result;

   let totalGpa = getGpaGrade(marks.bangla).gpa +  getGpaGrade(marks.english).gpa + getGpaGrade(marks.math).gpa + getGpaGrade(marks.science).gpa + getGpaGrade(marks.social_science).gpa + getGpaGrade(marks.religion).gpa ;

   cgpa = totalGpa / 6;

  if(marks.bangla >= 33 && marks.english >= 33 && marks.math >= 33 && marks.science >= 33 && marks.social_science >= 33 && marks.religion >= 33){

      if(cgpa >= 1 &&  cgpa < 2){
        result = "D";
      }else if(cgpa >= 2 &&  cgpa < 3){
        result = "C";
      }else if(cgpa >= 3 &&  cgpa < 3.5){
        result = "B";
      }else if(cgpa >= 3.5 &&  cgpa < 4){
        result = "A-";
      }else if(cgpa >= 4 &&  cgpa < 5){
        result = "A";
      }else if(cgpa >= 5){
        result = "A+";
      }

      return{
        result : result,
        cgpa  : cgpa,
      }

  }else{
    return{
      result : "F",
      cgpa  : 0,
    }
  }
};



