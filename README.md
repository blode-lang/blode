# Blode

> ⚠️ Blode is in early development and not yet available.  
> This is a solo project, so progress is slow.

Blode is a small, C++-based programming language designed to create **native Windows .exe programs**. The focus right now is on **simple terminal programs** using only the `sysio` library.

---

## Current State

At the moment, the only available functions are:

- `sys.output` – prints text to the console  
- `sys.clear` – clears the terminal screen  
- `sys.wait` – waits for a keypress to keep the window open

Everything else (math, logic, variables, files, graphics, sound) is not implemented yet.

---

## Examples

### Hello World

```blode
#contain <sysio>

act main() {
    sys.output = "Hello from Blode";
}
Clear Screen and Show Message
Blode
Copy code
#contain <sysio>

act main() {
    sys.clear();
    sys.output = "Starting fresh";
}
Wait for Keypress
Blode
Copy code
#contain <sysio>

act main() {
    sys.clear();
    sys.output = "Press any key to close...";
    sys.wait();
}
Combined Example
Blode
Copy code
#contain <sysio>

act main() {
    sys.clear();
    sys.output = "Blode console test";
    sys.output = "Window stays open until you press a key";
    sys.wait();
}
What’s Next
Planned improvements:
Basic math and logic
Variables and simple types
Better string handling
Eventually, graphical windows and UI elements
Cleaner build and run process
For now, Blode is about experimenting with syntax and creating small, standalone Windows executables.
How to Try
Currently, you need to clone the repository and build the compiler from source. There are no ready-to-use downloads yet.
Planned future commands:
Bash
Copy code
blode run example.bld
blode build example.bld
Contributing / Support
Since this is a solo project, any interest helps:
⭐ Star the repository
📝 Open an issue with thoughts or questions
💬 Share the kinds of programs you’d like to create
Thank you for checking out Blode!
