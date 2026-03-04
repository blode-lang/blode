# sysio Library

The `sysio` library ( short for **System Input/Output** )provides essential commands for interacting with the system in **Blode**.  
It must be imported before using any of the `sys` commands, such as:

- `sys.output` – print text to the terminal  
- `sys.clear()` – clear the terminal screen  
- `sys.wait(seconds)` – pause execution for a given time  
- `sys.input` – get input from the user  

---

## Importing sysio

To use the `sysio` library, include it at the top of your file with `#contain`:

```blode
#contain <sysio>
```
**Explanation:**
#contain is used to import libraries in your code.
The library name goes inside < >.
After importing, all functions and variables from the library become available.

## Example
```blode
#contain <sysio>

act main() {
    sys.output = "Hello, World!";
// Print message
    sys.clear()
// Clear the terminal
    sys.wait(1);
// Wait for 1 second
    sys.input = "What's your name?";
// Ask for user input
}
```
## Step by Step Explanation:

**"#contain <sysio>** – Imports the sysio library so you can use sys commands.

`sys.output = "Hello, World!"` – Prints the message to the terminal.

`sys.clear()` – Clears the terminal screen.

`sys.wait(1)` – Pauses execution for 1 second.

`sys.input = "What's your name?"` – Prompts the user for input and stores it in sys.input.

### Tip
Always import sysio before using any sys commands.
