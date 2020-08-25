const greeter = (name = "Shalom", age) => {
  console.log(name); //[name=] is creating a default entry if no argument is provided
};

greeter("Assael");  
greeter();
