# import hashlib

MAX_256 = 2**256
ZERO = "0x00"
ONE = "0x01"
UNKNOWN = "unknown"


def to_dec(s: str):
    return int(s, 16)


def prepend_0(s: str):
    ''' 
        takes in hex string
        prepends 0 at the front if the length is odd for positive numbers
    '''

    if len(s) % 2 != 0 and s[0] != "-":  # if odd length
        return "0x0" + s[2:]  # add 0 at the front to make the length even

    if len(s) % 2 == 0 and s[0] == "-":
        return "-0x0" + s[3:]

    return s


def make_32(s: str):
    num_bytes = int(len(s[2:]) / 2)
    if num_bytes < 32:
        diff = 32 - num_bytes
        return "00" * diff + s[:2]

    return s[2:]


def ADD(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    result = prepend_0(hex((x + y) % MAX_256))
    return {"result": result}


def MUL(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    result = prepend_0(hex((x * y) % MAX_256))
    return {"result": result}


def SUB(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    result = prepend_0(hex(x - y))
    return {"result": result}


def DIV(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])

    if y == 0 or y > x:
        return {"result": ZERO}

    result = prepend_0(hex(round(x / y)))
    return {"result": result}


def SDIV(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    if y == 0:
        return {"result": ZERO}

    if x == -2**255 or y == -1:
        return {"result": prepend_0(hex(-2**255))}

    return {"result": prepend_0(hex(round(x / y)))}


def MOD(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])

    if y == 0:
        return {"result": ZERO}

    return {"result": prepend_0(hex(x % y))}


def SMOD(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    if y == 0:
        return {"result": ZERO}

    return {"result": prepend_0(hex(x % y))}


def ADDMOD(params):
    x, y, z = to_dec(params["x"]), to_dec(params["y"]), to_dec(params["z"])
    if z == 0:
        return {"result": "0x0"}

    return {"result": prepend_0(hex((x + y) % z))}


def MULMOD(params):
    x, y, z = to_dec(params["x"]), to_dec(params["y"]), to_dec(params["z"])
    if z == 0:
        return {"result": ZERO}

    return {"result": prepend_0(hex((x * y) % z))}


def EXP(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    return {"result": prepend_0(hex((x**y) % MAX_256))}


def SIGNEXTEND(params):
    # TODO
    # x, _ = to_dec(params["x"]), to_dec(params["y"])
    return {"result": params["x"]}


def LT(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    if x < y:
        return {"result": ONE}
    return {"result": ZERO}


def GT(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    if x > y:
        return {"result": ONE}
    return {"result": ZERO}


def SLT(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    if x < y:
        return {"result": ONE}
    return {"result": ZERO}


def SGT(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    if x > y:
        return {"result": ONE}
    return {"result": ZERO}


def EQ(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    if x == y:
        return {"result": ONE}
    return {"result": ZERO}


def ISZERO(params):
    x = to_dec(params["x"])
    if x == 0:
        return {"result": ONE}
    return {"result": ZERO}


def AND(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    return {"result": prepend_0(hex(x & y))}


def OR(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    return {"result": prepend_0(hex(x | y))}


def XOR(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    return {"result": prepend_0(hex(x ^ y))}


def NOT(params):
    x = to_dec(params["x"])
    return {"result": prepend_0(hex(~x))}


def BYTE(params):
    x, y = to_dec(params["x"]), make_32(params["y"])
    if x < 32:
        return {"result": "0x" + y[x:x+1]}

    return {"result": ZERO}


def SHL(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    return {"result": prepend_0(hex((y << x) % MAX_256))}


def SHR(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    return {"result": prepend_0(hex(y >> x))}


def SAR(params):
    x, y = to_dec(params["x"]), to_dec(params["y"])
    return {"result": prepend_0(hex(x >> y))}


def SHA3(params):
    # TODO
    return {
        "instruction": "SHA3",
        "x": params["x"],
        "y": params["y"],
    }

    # ADD,
    # MUL,
    # SUB,
    # DIV,
    # SDIV,
    # MOD,
    # SMOD,
    # ADDMOD,
    # MULMOD,
    # EXP,
    # SIGNEXTEND,

    # // 0x10 range - comparison ops.
    # LT = 0x10,
    # GT,
    # SLT,
    # SGT,
    # EQ,
    # ISZERO,
    # AND,
    # OR,
    # XOR,
    # NOT,
    # BYTE,
    # SHL,
    # SHR,
    # SAR,

    # SHA3 = 0x20,

# def u256_sub(params):

#     x, y = params["x"], params["y"]
#     diff = (int(x, 16) - int(y, 16))

#     if diff < 0:
#         diff = ~diff


INSTRUCTION_MAP = {

    0x01: ADD,
    0x02: MUL,
    0x03: SUB,
    0x04: DIV,
    0x05: SDIV,
    0x06: MOD,
    0x07: SMOD,
    0x08: ADDMOD,
    0x09: MULMOD,
    0x0A: EXP,
    0x0B: SIGNEXTEND,

    ##
    0x10: LT,
    0x11: GT,
    0x12: SLT,
    0x13: SGT,
    0x14: EQ,
    0x15: ISZERO,
    0x16: AND,
    0x17: OR,
    0x18: XOR,
    0x19: NOT,
    0x1A: BYTE,
    0x1B: SHL,
    0x1C: SHR,
    0x1D: SAR,

    ##
    0x20: SHA3,
}


def u256_handler(data):
    opcode = data['opcode']
    params = data['params']

    return INSTRUCTION_MAP[opcode](params)
