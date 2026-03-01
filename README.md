# Blode

> ⚠️ Blode is in early development and not yet available.  
> This is a solo project, so progress is slow.

Blode is a small, C++-based programming language designed to create **native Windows .exe programs**. The focus right now is on **simple terminal programs** using only the `sysio` library from blode.

---

## Current State

At the moment, the only available functions are:

- `sys.output` – prints text to the console  
- `sys.clear` – clears the terminal screen  
- `sys.wait` – waits for the next action, example `sys.wait(1)` is waiiting 1 second till the next action
- `sys.input` - user can type something

Everything else (math, variables, files, graphics, sound) is not implemented yet.

---

## Examples

### Hello World

```blode
#contain <sysio>

act main() {
    sys.output = "Hello from Blode";
}
```
## Clear Terminal and Show Message

```blode
#contain <sysio>

act main() {
    sys.clear();
    sys.output = "Terminal cleaned";
}
```

## Combined Example
```blode
#contain <sysio>

act main() {
    sys.clear();
    sys.output = "Blode console test";
    sys.wait(1);
    sys.output = "Exit!";
}
```
# What’s Next
## Planned improvements:
• Basic math and logic

• Variables and simple types

• Better string handling

• Eventually, graphical windows and UI    elements

• Cleaner build and run process

• For now, Blode is about experimenting   with syntax and creating small,          standalone Windows executables.

# How to Try
Currently, blode is in development and will be will soon available for download.
# Planned future commands:
```bash
blode run example.bld
blode build example.bld
```
# Support
Since this is a `solo project`, any interest helps:

⭐ Star the repository

💬 Share the kinds of programs you’d like to create

### Thank you for checking out Blode!
