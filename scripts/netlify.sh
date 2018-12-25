#!/bin/bash

set -eu

echo "Setup Rust"
curl https://sh.rustup.rs -sSf | sh -s -- -y
export PATH="$PATH:$HOME/.cargo/bin"
cargo install wasm-pack

echo "Build"
yarn build
