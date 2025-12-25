import json

PASSING_TESTS = [
    "F2.1.1", "F2.1.2",
    "F2.2.1", "F2.2.2",
    "F2.3.1", "F2.3.2",
    "F2.4.1", "F2.4.2", 
    "F2.5.1", "F2.5.2"
]

def update_feature_list():
    try:
        with open('feature_list.json', 'r') as f:
            features = json.load(f)
        
        updated_count = 0
        for feature in features:
            if feature['id'] in PASSING_TESTS:
                feature['passes'] = True
                updated_count += 1
        
        with open('feature_list.json', 'w') as f:
            json.dump(features, f, indent=2)
            
        print(f"Updated {updated_count} tests to passes: true")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    update_feature_list()
