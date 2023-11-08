input = STDIN.read.split("\n")

valid_amount = 0
regex = /([0-9]+)-([0-9]+) ([a-z]): (.+)/
input.each do |line|
    min, max, letter, password = line.match(regex).captures
    count = password.count letter 
    if (min.to_i <= count) && (count <= max.to_i)
        valid_amount += 1
    end
end

puts valid_amount
