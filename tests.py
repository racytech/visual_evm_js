#!/usr/bin/env python3

# export function strHexToByte(a: string, b: string) {
#     return parseInt(`0x${a}${b}`);
# }

# export function strHexToBytes(input: string): number[] {
#     let data = [];

#     if (input.length > 2) {
#         input = input.slice(2);
#         console.log(input);
#         let i = 0
#         for (; i < input.length; i += 2) {
#             let byte = strHexToByte(input[i], input[i + 1]);
#             if (byte < 0 || byte > 255) throw `INVALID BYTE: ${byte}`;
#             data.push(byte);
#         }

#     } else {
#         throw `INPUT LENGTH < 2: INPUT: ${input}`;
#     }



#     return data;
# }

def str_hex_to_byte(a: str, b:str): 
    return int(f'0x{a}{b}', 16)


def str_hex_to_bytes(input: str):
    _bytes = []

    

    if len(input) > 2:
        input = input[2:]
        l = len(input)
        i = 0
        while i < l:
            if i + 1 < l:
                byte = str_hex_to_byte(input[i], input[i+1])
                _bytes.append(byte)
            else:
                byte = str_hex_to_byte("0", input[i])
                _bytes.append(byte)

            i += 2

    return _bytes


HEX = "0x235022555"

_bytes = str_hex_to_bytes(HEX)


idx = 7; # points to currently "in process" 32bit value in Int
myInt = [0, 0, 0, 0, 0, 0, 0, 0]
to_set = 0

i = len(_bytes) - 1
while i >= 0:
    to_shift = to_set * 8
    _byte = _bytes[i] << to_shift
    myInt[idx] |= _byte

    to_set += 1

    if to_set == 4:
        idx -= 1
        to_set = 0

    i -= 1

# for (let i = bytes.length - 1; i >= 0; i--) {
#     let to_shift = set * 8;
#     let byte = bytes[i] << to_shift;
#     console.log(to_shift, byte, set);
#     myInt[idx] = byte;

#     set++;

#     if (set === 4) {
#         idx--;
#         set = 0;
#     }

# }
for i in myInt:
    print(bin(i))

print(bin(int(HEX, 16)))