# Blode Basics

#### This is a guide for the Blode Basics!

---

## 1. Including Libraries

To use system features like input or output, you need to include the necessary modules at the very top of your file.

- **`#contain`**: Used to import libraries.
```blode
#contain <sysio>
```
## 2. Defining Actions
In Blode, logic is wrapped in actions rather than standard functions.
act: The keyword to define a block of code.
After act, you can give your function a name, for example `act main`
```blode
act main() {
    // Your code
}
```
## 3. System I/O (sys)
Blode interacts with the terminal through the sys object. Here are the primary commands you'll use:
sys.output: Prints text to the terminal.
```blode
sys.output = "Hello, World!";
sys.input: //Displays a prompt and waits for user interaction.
```
```blode
sys.input = "How are you?";
sys.clear(): //Clears the current terminal screen.
sys.wait(1): //waits 1 second till the next function
```
## 4. A Complete Example
Putting it all together, here is a simple script that clears the screen, says hello, and waits for you to finish:
```blode
#contain <sysio>

act main() {
    sys.clear();
    sys.output = "Welcome to Blode!";
    sys.wait(1);
    sys.input = "Press Enter to exit...";
}
```
### I hope this little guide helped. Have fun coding!
