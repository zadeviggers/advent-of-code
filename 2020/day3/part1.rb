input = STDIN.read.split("\n")

trees = 0
def get_cell_at(map, x, y)
    line = map[y]
    convertedX = x % line.length
    line[convertedX]
end

x = 0
y = 0
while y < input.length do
    cell = get_cell_at(input, x, y)
    if cell == "#"
        trees += 1
    end
    y += 1
    x += 3
end

puts trees
