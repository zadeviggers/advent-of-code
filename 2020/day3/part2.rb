input = STDIN.read.split("\n")

def get_cell_at(map, x, y)
    line = map[y]
    convertedX = x % line.length
    line[convertedX]
end


# This shouldn't start at 1 ideally, but
# it's a comprimise so that we can use *=
total_trees = 1

slopes = [[1,1],[3,1],[5,1],[7,1],[1,2]]
slopes.each do |slope|
    x_increment, y_increment = slope
    slope_trees = 0
    x = 0
    y = 0
    while y < input.length do
        cell = get_cell_at(input, x, y)
        if cell == "#"
            slope_trees += 1
        end
        y += y_increment
        x += x_increment
    end
    total_trees *= slope_trees
end

puts total_trees
