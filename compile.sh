#!/bin/bash
targets=("x86_64-unknown-linux-gnu" "x86_64-pc-windows-msvc" "x86_64-apple-darwin" "aarch64-apple-darwin")
version=0.1.0-alpha
for target in ${targets[@]}; do
    eval "deno compile -A --unstable --target $target --output skrapilo-$version-$target main.ts" 
done